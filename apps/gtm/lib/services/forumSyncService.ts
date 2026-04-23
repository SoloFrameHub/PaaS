/**
 * NodeBB Forum Sync Service
 * Fetches topics and posts from the NodeBB forum API and upserts them
 * into PostgreSQL for Metabase analytics (community discussion tracking).
 */

import { getDb, hasDatabase, schema } from '@/lib/db';
import { nodebbClient } from '@/lib/nodebb/client';
import { sql } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import type { NodeBBTopic, NodeBBPost } from '@/lib/nodebb/types';

export async function syncForumData(): Promise<{ topics: number; posts: number }> {
    if (!hasDatabase()) {
        throw new Error('Database not available');
    }

    const db = getDb();
    if (!db) throw new Error('Database connection failed');

    let topicCount = 0;
    let postCount = 0;

    // Fetch first 3 pages of recent topics (covers ~60 topics)
    for (let page = 1; page <= 3; page++) {
        let topics: NodeBBTopic[];
        try {
            topics = await nodebbClient.getRecentTopics(page);
        } catch (err) {
            logger.error(`Failed to fetch forum topics page ${page}`, { err });
            break;
        }

        if (topics.length === 0) break;

        for (const topic of topics) {
            try {
                // Upsert topic
                await db.insert(schema.forumTopicSync).values({
                    nodebbTid: topic.tid,
                    title: topic.title,
                    categoryName: topic.category?.name ?? null,
                    slug: topic.slug,
                    userName: topic.user?.username ?? null,
                    postCount: topic.postcount ?? 0,
                    viewCount: topic.viewcount ?? 0,
                    voteCount: topic.votes ?? 0,
                    timestampMs: topic.timestamp,
                    lastPostTimestampMs: topic.lastposttime ?? null,
                }).onConflictDoUpdate({
                    target: schema.forumTopicSync.nodebbTid,
                    set: {
                        title: sql`EXCLUDED.title`,
                        categoryName: sql`EXCLUDED.category_name`,
                        postCount: sql`EXCLUDED.post_count`,
                        viewCount: sql`EXCLUDED.view_count`,
                        voteCount: sql`EXCLUDED.vote_count`,
                        lastPostTimestampMs: sql`EXCLUDED.last_post_timestamp_ms`,
                        syncedAt: sql`now()`,
                    },
                });
                topicCount++;

                // Fetch and upsert posts for this topic
                const posts = await nodebbClient.getTopicPosts(topic.tid);
                for (const post of posts) {
                    await db.insert(schema.forumPostSync).values({
                        nodebbPid: post.pid,
                        nodebbTid: post.tid,
                        userName: post.user?.username ?? null,
                        contentPreview: post.content ? post.content.slice(0, 500) : null,
                        voteCount: post.votes ?? 0,
                        timestampMs: post.timestamp,
                    }).onConflictDoUpdate({
                        target: schema.forumPostSync.nodebbPid,
                        set: {
                            contentPreview: sql`EXCLUDED.content_preview`,
                            voteCount: sql`EXCLUDED.vote_count`,
                            syncedAt: sql`now()`,
                        },
                    });
                    postCount++;
                }
            } catch (err) {
                logger.error('Failed to sync topic', { tid: topic.tid, err });
            }
        }
    }

    logger.info('Forum sync complete', { topicCount, postCount });
    return { topics: topicCount, posts: postCount };
}
