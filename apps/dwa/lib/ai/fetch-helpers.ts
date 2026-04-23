/**
 * Fetch website or LinkedIn content for analysis. No Google deps.
 */

import { logger } from '@/lib/logger';

export async function fetchWebsiteText(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
      },
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      logger.warn('Website fetch failed', { status: response.status, url });
      return '';
    }
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('text/html')) {
      logger.warn('Invalid content type', { contentType, url });
      return '';
    }
    const htmlText = await response.text();
    const html = htmlText.slice(0, 200000);
    const text = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 50000);
    return text;
  } catch (error) {
    logger.error('Website fetch error', { url, error });
    return '';
  }
}

export async function fetchLinkedinSnippet(url: string): Promise<{ title: string; description: string; rawSnippet: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      logger.warn('LinkedIn fetch failed', { status: response.status });
      return { title: '', description: '', rawSnippet: '' };
    }
    const html = await response.text();
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const descMatch = html.match(/<meta name="description" content="(.*?)"/);
    return {
      title: titleMatch ? titleMatch[1] : '',
      description: descMatch ? descMatch[1] : '',
      rawSnippet: html.slice(0, 5000),
    };
  } catch (error) {
    logger.warn('LinkedIn fetch error', { error });
    return { title: '', description: '', rawSnippet: '' };
  }
}
