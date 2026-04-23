<?php

namespace RPS\AiModeration\Service;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class AiModerationClient
{
    protected Client $http;
    protected string $apiKey;
    protected string $provider;

    private const OPENAI_MODERATION_URL = 'https://api.openai.com/v1/moderations';

    public function __construct(string $apiKey, string $provider = 'openai')
    {
        $this->apiKey = $apiKey;
        $this->provider = $provider;
        $this->http = new Client([
            'timeout' => 10,
            'connect_timeout' => 5,
        ]);
    }

    /**
     * Send text to the moderation API and return structured results.
     *
     * Only sends the post text — no usernames, IDs, or other PII.
     *
     * @return array{flagged: bool, categories: array, category_scores: array}|null
     */
    public function moderate(string $text): ?array
    {
        if (empty($this->apiKey)) {
            resolve('log')->warning('[rps-ai-moderation] No API key configured');
            return null;
        }

        try {
            $response = $this->http->post(self::OPENAI_MODERATION_URL, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => 'omni-moderation-latest',
                    'input' => $text,
                ],
            ]);

            $body = json_decode($response->getBody()->getContents(), true);

            if (!isset($body['results'][0])) {
                resolve('log')->error('[rps-ai-moderation] Unexpected API response structure');
                return null;
            }

            $result = $body['results'][0];

            return [
                'flagged' => $result['flagged'] ?? false,
                'categories' => $result['categories'] ?? [],
                'category_scores' => $result['category_scores'] ?? [],
            ];
        } catch (GuzzleException $e) {
            resolve('log')->error('[rps-ai-moderation] API request failed: ' . $e->getMessage());
            return null;
        }
    }
}
