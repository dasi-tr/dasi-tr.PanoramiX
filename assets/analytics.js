(function () {
  'use strict';
  if (window.__hymmshotAnalyticsLoaded) return;
  window.__hymmshotAnalyticsLoaded = true;

  const measurementId = 'G-DZDDHW8FY1';
  const storeProductId = '9n6580jqmpw8';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  if (!document.querySelector('script[data-hymmshot-ga4]')) {
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    tag.dataset.hymmshotGa4 = 'true';
    document.head.appendChild(tag);
  }
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  function sendEvent(name, parameters) {
    try {
      if (typeof window.gtag !== 'function') return;
      window.gtag('event', name, parameters);
    } catch (_) {
      // Tracking must never interfere with navigation or media playback.
    }
  }

  function pagePath() { return window.location.pathname || '/'; }

  function trackMicrosoftStoreClick(event) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    if (!event.target || typeof event.target.closest !== 'function') return;
    const link = event.target.closest('a[data-download-cta]');
    if (!link || !link.href || !link.href.includes('apps.microsoft.com/detail/' + storeProductId)) return;
    const parameters = {
      download_destination: 'microsoft_store',
      cta_location: link.dataset.downloadCta,
      store_product_id: storeProductId,
      app_version: '1.0.0',
      page_path: pagePath(),
      link_url: link.href
    };
    const normalSameTabClick = event.type === 'click' &&
      event.button === 0 &&
      !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey &&
      (!link.target || link.target.toLowerCase() === '_self');

    if (!normalSameTabClick) {
      sendEvent('download_click', parameters);
      return;
    }

    event.preventDefault();
    const href = link.href;
    let navigationStarted = false;
    let fallbackTimer = null;
    function navigateOnce() {
      if (navigationStarted) return;
      navigationStarted = true;
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
      window.location.assign(href);
    }

    fallbackTimer = window.setTimeout(navigateOnce, 200);
    sendEvent('download_click', Object.assign({}, parameters, {
      event_callback: navigateOnce,
      event_timeout: 175,
      transport_type: 'beacon'
    }));
  }

  document.addEventListener('click', trackMicrosoftStoreClick);
  document.addEventListener('auxclick', trackMicrosoftStoreClick);

  document.addEventListener('click', function (event) {
    if (!event.target || typeof event.target.closest !== 'function') return;
    const demoLink = event.target.closest('a[data-demo-cta]');
    if (demoLink) {
      sendEvent('demo_cta_click', {
        cta_location: demoLink.dataset.demoCta,
        page_path: pagePath()
      });
    }
  });

  function trackProductVideo() {
    const video = document.querySelector('video[data-analytics-video]');
    if (!video) return;
    const baseParameters = {
      video_name: video.dataset.videoName || 'HymmShot product demo',
      video_file: video.dataset.videoFile || 'PanoramiX.mp4',
      page_path: pagePath()
    };
    let viewSent = false;
    let isHalfVisible = false;
    let visibilityTimer = null;
    let completeSent = false;
    let qualifiedWatchTime = 0;
    let lastMediaTime = null;
    let lastWallTime = null;
    const progressSent = new Set();

    function clockNow() {
      return window.performance && typeof window.performance.now === 'function'
        ? window.performance.now()
        : Date.now();
    }

    function resetPlaybackSample() {
      lastMediaTime = null;
      lastWallTime = null;
    }

    function isQualifiedPlayback() {
      return viewSent && isHalfVisible && document.visibilityState !== 'hidden' &&
        !video.paused && !video.ended && video.readyState >= 2 &&
        Number.isFinite(video.duration) && video.duration > 0;
    }

    function startPlaybackSample() {
      if (!isQualifiedPlayback()) {
        resetPlaybackSample();
        return;
      }
      lastMediaTime = video.currentTime;
      lastWallTime = clockNow();
    }

    function clearVisibilityTimer() {
      if (visibilityTimer !== null) {
        window.clearTimeout(visibilityTimer);
        visibilityTimer = null;
      }
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        const entry = entries[0];
        if (!entry) return;
        isHalfVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        if (isHalfVisible) {
          if (!viewSent && visibilityTimer === null) {
            visibilityTimer = window.setTimeout(function () {
              if (!isHalfVisible || viewSent) return;
              viewSent = true;
              visibilityTimer = null;
              sendEvent('video_view', baseParameters);
              startPlaybackSample();
            }, 1000);
          } else if (viewSent) startPlaybackSample();
        } else {
          clearVisibilityTimer();
          resetPlaybackSample();
        }
      }, { threshold: [0, 0.5, 1] });
      observer.observe(video);
    }

    video.addEventListener('timeupdate', function () {
      if (!isQualifiedPlayback()) {
        resetPlaybackSample();
        return;
      }

      const currentMediaTime = video.currentTime;
      const currentWallTime = clockNow();
      if (lastMediaTime === null || lastWallTime === null) {
        lastMediaTime = currentMediaTime;
        lastWallTime = currentWallTime;
        return;
      }

      let mediaDelta = currentMediaTime - lastMediaTime;
      if (mediaDelta < 0 && video.loop) {
        mediaDelta = (video.duration - lastMediaTime) + currentMediaTime;
      }
      const wallDelta = Math.max(0, (currentWallTime - lastWallTime) / 1000);
      lastMediaTime = currentMediaTime;
      lastWallTime = currentWallTime;
      if (mediaDelta <= 0 || wallDelta <= 0) return;

      qualifiedWatchTime += Math.min(mediaDelta, wallDelta + 0.25);
      [25, 50, 75].forEach(function (milestone) {
        if (qualifiedWatchTime >= video.duration * (milestone / 100) && !progressSent.has(milestone)) {
          progressSent.add(milestone);
          sendEvent('video_progress', Object.assign({}, baseParameters, { video_percent: milestone }));
        }
      });
      if (qualifiedWatchTime >= video.duration * 0.9 && !completeSent) {
        completeSent = true;
        sendEvent('video_complete', Object.assign({}, baseParameters, { video_percent: 100 }));
      }
    });

    ['pause', 'waiting', 'stalled', 'seeking', 'ended', 'emptied'].forEach(function (eventName) {
      video.addEventListener(eventName, resetPlaybackSample);
    });
    ['play', 'playing', 'seeked', 'loadedmetadata'].forEach(function (eventName) {
      video.addEventListener(eventName, startPlaybackSample);
    });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') resetPlaybackSample();
      else startPlaybackSample();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackProductVideo, { once: true });
  } else trackProductVideo();
})();
