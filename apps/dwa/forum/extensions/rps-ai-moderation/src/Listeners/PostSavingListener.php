<?php

namespace RPS\AiModeration\Listeners;

use Flarum\Post\Event\Saving;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Flags\Flag;
use RPS\AiModeration\Service\AiModerationClient;
use RPS\AiModeration\Service\RiskEvaluator;
use Illuminate\Contracts\Events\Dispatcher;

class PostSavingListener
{
    protected AiModerationClient $client;
    protected RiskEvaluator $evaluator;
    protected SettingsRepositoryInterface $settings;

    public function __construct(
        AiModerationClient $client,
        RiskEvaluator $evaluator,
        SettingsRepositoryInterface $settings
    ) {
        $this->client = $client;
        $this->evaluator = $evaluator;
        $this->settings = $settings;
    }

    public function handle(Saving $event): void
    {
        $post = $event->post;
        $actor = $event->actor;

        // Skip if extension is disabled
        if (!$this->settings->get('rps-ai-moderation.enabled')) {
            return;
        }

        // Skip if actor has bypass permission
        if ($actor->hasPermission('rps-ai.bypass')) {
            return;
        }

        // Only check posts with content (not metadata-only edits)
        $content = $post->content ?? '';
        if (empty(trim($content))) {
            return;
        }

        // Call AI moderation API
        $result = $this->client->moderate($content);

        if ($result === null) {
            // API failure — allow post but log the error
            resolve('log')->error('[rps-ai-moderation] API call failed for post', [
                'post_id' => $post->id,
                'discussion_id' => $post->discussion_id,
            ]);
            return;
        }

        // Evaluate risk level
        $riskLevel = $this->evaluator->evaluate($result);

        // Store moderation metadata on the post
        $post->setAttribute('ai_moderation_level', $riskLevel);
        $post->setAttribute('ai_moderation_result', json_encode($result));

        // Apply actions based on risk level
        switch ($riskLevel) {
            case 0:
                // Safe — allow normally
                break;

            case 1:
                // Sensitive but acceptable — publish with internal flag
                $this->createInternalFlag($post, $result, $riskLevel);
                break;

            case 2:
                // Concerning — hold for moderator review
                $post->is_approved = false;
                $this->createInternalFlag($post, $result, $riskLevel);
                $this->notifyModerators($post, $riskLevel);
                break;

            case 3:
                // Severe — hide immediately and alert staff
                $post->hidden_at = now();
                $post->hidden_user_id = null; // system action
                $this->createInternalFlag($post, $result, $riskLevel);
                $this->notifyModerators($post, $riskLevel);
                break;
        }
    }

    protected function createInternalFlag($post, array $result, int $riskLevel): void
    {
        // Flag will be created after post is saved via a deferred callback
        $post->afterSave(function ($post) use ($result, $riskLevel) {
            if (class_exists(Flag::class)) {
                $flag = new Flag();
                $flag->post_id = $post->id;
                $flag->type = 'ai_moderation';
                $flag->reason = $this->buildFlagReason($result, $riskLevel);
                $flag->reason_detail = json_encode([
                    'risk_level' => $riskLevel,
                    'categories' => $result['categories'] ?? [],
                    'scores' => $result['category_scores'] ?? [],
                ]);
                $flag->created_at = now();
                $flag->save();
            }
        });
    }

    protected function buildFlagReason(array $result, int $riskLevel): string
    {
        $levelLabels = [
            1 => 'Sensitive content detected',
            2 => 'Concerning content — needs review',
            3 => 'Severe risk — auto-hidden',
        ];

        $triggered = [];
        foreach (($result['categories'] ?? []) as $category => $flagged) {
            if ($flagged) {
                $triggered[] = str_replace('/', ' / ', $category);
            }
        }

        $reason = $levelLabels[$riskLevel] ?? 'AI flagged';
        if (!empty($triggered)) {
            $reason .= ' (' . implode(', ', $triggered) . ')';
        }

        return $reason;
    }

    protected function notifyModerators($post, int $riskLevel): void
    {
        // Deferred notification after post save
        $post->afterSave(function ($post) use ($riskLevel) {
            resolve('log')->warning('[rps-ai-moderation] Risk level ' . $riskLevel . ' content detected', [
                'post_id' => $post->id,
                'discussion_id' => $post->discussion_id,
                'user_id' => $post->user_id,
            ]);
        });
    }
}
