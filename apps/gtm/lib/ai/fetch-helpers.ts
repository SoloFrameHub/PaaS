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
  const empty = { title: '', description: '', rawSnippet: '' };

  // Normalize LinkedIn URL to public format
  const cleanUrl = url.replace(/\/$/, '');

  // Strategy 1: Fetch with standard browser UA (LinkedIn sometimes serves meta tags)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(cleanUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
      },
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      logger.warn('LinkedIn fetch failed', { status: response.status, url: cleanUrl });
      return empty;
    }

    const html = await response.text();

    // Detect auth wall / login redirect (LinkedIn serves these to bots)
    const isAuthWall = html.includes('authwall')
      || (html.includes('login') && html.includes('session_redirect'))
      || html.includes('Sign in to LinkedIn')
      || (html.length < 1000 && (html.includes('login') || html.includes('redirect')));

    if (isAuthWall) {
      logger.info('LinkedIn returned auth wall, extracting meta tags only', { url: cleanUrl });
    }

    // Extract all available meta tags — LinkedIn often includes these even on auth walls
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*?)"/i)
      || html.match(/<meta\s+content="([^"]*?)"\s+name="description"/i);
    const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]*?)"/i);
    const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]*?)"/i);

    const title = ogTitleMatch?.[1] || titleMatch?.[1] || '';
    const description = ogDescMatch?.[1] || descMatch?.[1] || '';

    // Extract any visible text from the page (strips scripts/styles)
    const bodyText = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 5000);

    if (title || description) {
      logger.info('LinkedIn meta tags extracted', {
        url: cleanUrl,
        hasTitle: !!title,
        hasDescription: !!description,
        titleLength: title.length,
        descLength: description.length,
      });
    } else {
      logger.warn('LinkedIn returned no usable meta tags', { url: cleanUrl, htmlLength: html.length });
    }

    return {
      title,
      description,
      rawSnippet: isAuthWall ? '' : bodyText,
    };
  } catch (error) {
    logger.warn('LinkedIn fetch error', { url: cleanUrl, error });
    return empty;
  }
}
