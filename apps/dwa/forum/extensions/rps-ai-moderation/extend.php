<?php

namespace RPS\AiModeration;

use Flarum\Extend;
use RPS\AiModeration\Listeners\PostSavingListener;
use RPS\AiModeration\Service\AiModerationClient;
use RPS\AiModeration\Service\RiskEvaluator;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Event())
        ->listen(\Flarum\Post\Event\Saving::class, PostSavingListener::class),

    (new Extend\ServiceProvider())
        ->register(function ($container) {
            $container->singleton(AiModerationClient::class, function ($container) {
                $settings = $container->make(\Flarum\Settings\SettingsRepositoryInterface::class);
                return new AiModerationClient(
                    $settings->get('rps-ai-moderation.api_key', ''),
                    $settings->get('rps-ai-moderation.api_provider', 'openai')
                );
            });

            $container->singleton(RiskEvaluator::class, function ($container) {
                $settings = $container->make(\Flarum\Settings\SettingsRepositoryInterface::class);
                return new RiskEvaluator(
                    (float) $settings->get('rps-ai-moderation.threshold_level1', '0.1'),
                    (float) $settings->get('rps-ai-moderation.threshold_level2', '0.3'),
                    (float) $settings->get('rps-ai-moderation.threshold_level3', '0.7')
                );
            });
        }),

    (new Extend\Settings())
        ->default('rps-ai-moderation.api_key', '')
        ->default('rps-ai-moderation.api_provider', 'openai')
        ->default('rps-ai-moderation.threshold_level1', '0.1')
        ->default('rps-ai-moderation.threshold_level2', '0.3')
        ->default('rps-ai-moderation.threshold_level3', '0.7')
        ->default('rps-ai-moderation.enabled', '1')
        ->default('rps-ai-moderation.crisis_message', 'If you or someone you know is in crisis, please contact the 988 Suicide & Crisis Lifeline by calling or texting 988.'),

    (new Extend\Permission())
        ->add('rps-ai.bypass', 'moderate'),
];
