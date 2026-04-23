/**
 * GA4 Custom Event Tracking for Static HTML Pages
 *
 * Loaded by all static pages (home, blog, playbook, academy, legal).
 * Provides three tracking mechanisms:
 * 1. Declarative click tracking via data-ga-event / data-ga-label attributes
 * 2. Automatic outbound link tracking
 * 3. Scroll milestone tracking (25%, 50%, 75%, 100%)
 * 4. Page engagement time tracking
 */
(function () {
  'use strict';

  function gtagReady() {
    return typeof window.gtag === 'function';
  }

  function trackEvent(name, params) {
    if (gtagReady()) {
      window.gtag('event', name, params || {});
    }
  }

  // 1. Declarative data-attribute click tracking
  // Usage: <a data-ga-event="cta_click" data-ga-label="Start Learning" href="...">
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-ga-event]');
    if (!el) return;
    trackEvent(el.getAttribute('data-ga-event'), {
      event_label: el.getAttribute('data-ga-label') || el.textContent.trim().substring(0, 50),
      link_url: el.href || '',
      page_path: window.location.pathname,
    });
  });

  // 2. Outbound link tracking
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link || link.hasAttribute('data-ga-event')) return; // skip if already tracked
    try {
      var url = new URL(link.href);
      if (url.hostname !== window.location.hostname) {
        trackEvent('outbound_click', {
          link_url: link.href,
          link_text: link.textContent.trim().substring(0, 100),
          outbound: true,
        });
      }
    } catch (err) {
      /* ignore malformed URLs */
    }
  });

  // 3. Scroll milestone tracking
  var milestones = [25, 50, 75, 100];
  var firedMilestones = {};
  var scrollTimer;

  function checkScroll() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    var pct = Math.round((window.scrollY / docHeight) * 100);
    for (var i = 0; i < milestones.length; i++) {
      var m = milestones[i];
      if (pct >= m && !firedMilestones[m]) {
        firedMilestones[m] = true;
        trackEvent('scroll_milestone', {
          percent_scrolled: m,
          page_path: window.location.pathname,
        });
      }
    }
  }

  window.addEventListener(
    'scroll',
    function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(checkScroll, 200);
    },
    { passive: true }
  );

  // 4. Page engagement time (fires on unload for sessions > 10s)
  var startTime = Date.now();
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      var seconds = Math.round((Date.now() - startTime) / 1000);
      if (seconds > 10) {
        trackEvent('page_engagement', {
          engagement_time_seconds: seconds,
          page_path: window.location.pathname,
        });
      }
    }
  });
})();
