<?php

namespace RPS\AiModeration\Service;

class RiskEvaluator
{
    protected float $thresholdLevel1;
    protected float $thresholdLevel2;
    protected float $thresholdLevel3;

    /**
     * Categories that trigger elevated concern (mental health context).
     */
    private const HIGH_RISK_CATEGORIES = [
        'self-harm',
        'self-harm/intent',
        'self-harm/instructions',
        'violence',
        'violence/graphic',
    ];

    public function __construct(
        float $thresholdLevel1 = 0.1,
        float $thresholdLevel2 = 0.3,
        float $thresholdLevel3 = 0.7
    ) {
        $this->thresholdLevel1 = $thresholdLevel1;
        $this->thresholdLevel2 = $thresholdLevel2;
        $this->thresholdLevel3 = $thresholdLevel3;
    }

    /**
     * Evaluate AI moderation result and return risk level 0-3.
     *
     * Level 0: Safe — all scores below threshold_level1
     * Level 1: Sensitive — any score between level1 and level2
     * Level 2: Concerning — high-risk category score between level2 and level3
     * Level 3: Severe — high-risk category score >= level3
     *
     * @param array{flagged: bool, categories: array, category_scores: array} $result
     */
    public function evaluate(array $result): int
    {
        $scores = $result['category_scores'] ?? [];

        if (empty($scores)) {
            return 0;
        }

        $maxHighRiskScore = 0.0;
        $maxAnyScore = 0.0;

        foreach ($scores as $category => $score) {
            $score = (float) $score;
            $maxAnyScore = max($maxAnyScore, $score);

            if ($this->isHighRiskCategory($category)) {
                $maxHighRiskScore = max($maxHighRiskScore, $score);
            }
        }

        // Level 3: Severe — high-risk category at or above level3 threshold
        if ($maxHighRiskScore >= $this->thresholdLevel3) {
            return 3;
        }

        // Level 2: Concerning — high-risk category at or above level2 threshold
        if ($maxHighRiskScore >= $this->thresholdLevel2) {
            return 2;
        }

        // Level 1: Sensitive — any category at or above level1 threshold
        if ($maxAnyScore >= $this->thresholdLevel1) {
            return 1;
        }

        // Level 0: Safe
        return 0;
    }

    protected function isHighRiskCategory(string $category): bool
    {
        // Normalize category name (OpenAI uses both / and _ separators)
        $normalized = str_replace('_', '-', strtolower($category));

        foreach (self::HIGH_RISK_CATEGORIES as $highRisk) {
            if ($normalized === $highRisk || str_starts_with($normalized, $highRisk)) {
                return true;
            }
        }

        return false;
    }
}
