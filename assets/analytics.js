(function () {
  'use strict';
  if (window.__hymmshotAnalyticsLoaded) return;
  window.__hymmshotAnalyticsLoaded = true;

  const measurementId = 'G-DZDDHW8FY1';
  const products = {
    '9n6580jqmpw8': { name: 'HymmScroll' },
    '9p1lzh1rvsdb': { name: 'HymmStack' }
  };
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
    try { if (typeof window.gtag === 'function') window.gtag('event', name, parameters); } catch (_) {}
  }
  function pagePath() { return window.location.pathname || '/'; }
  function productFromUrl(url) {
    const match = String(url || '').match(/apps\.microsoft\.com\/detail\/([a-z0-9]+)/i);
    if (!match) return null;
    const id = match[1].toLowerCase();
    return products[id] ? { id: id, name: products[id].name } : null;
  }

  function trackMicrosoftStoreClick(event) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    if (!event.target || typeof event.target.closest !== 'function') return;
    const link = event.target.closest('a[data-download-cta]');
    if (!link || !link.href) return;
    const product = productFromUrl(link.href);
    if (!product) return;
    const parameters = {
      download_destination: 'microsoft_store',
      product_name: product.name,
      store_product_id: product.id,
      cta_location: link.dataset.downloadCta || 'unknown',
      page_path: pagePath(),
      link_url: link.href
    };
    const normalSameTabClick = event.type === 'click' && event.button === 0 &&
      !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey &&
      (!link.target || link.target.toLowerCase() === '_self');
    if (!normalSameTabClick) { sendEvent('download_click', parameters); return; }
    event.preventDefault();
    const href = link.href;
    let navigationStarted = false;
    function navigateOnce() { if (navigationStarted) return; navigationStarted = true; window.location.assign(href); }
    const fallbackTimer = window.setTimeout(navigateOnce, 200);
    sendEvent('download_click', Object.assign({}, parameters, {
      event_callback: function(){ window.clearTimeout(fallbackTimer); navigateOnce(); },
      event_timeout: 175,
      transport_type: 'beacon'
    }));
  }
  document.addEventListener('click', trackMicrosoftStoreClick);
  document.addEventListener('auxclick', trackMicrosoftStoreClick);

  document.addEventListener('click', function (event) {
    if (!event.target || typeof event.target.closest !== 'function') return;
    const demoLink = event.target.closest('a[data-demo-cta]');
    if (demoLink) sendEvent('demo_cta_click', { cta_location: demoLink.dataset.demoCta || 'unknown', page_path: pagePath() });
  });

  function trackVideo(video) {
    const baseParameters = {
      product_name: video.dataset.productName || '',
      video_name: video.dataset.videoName || 'HymmShot product demo',
      video_file: video.dataset.videoFile || '',
      page_path: pagePath()
    };
    let viewSent=false, halfVisible=false, timer=null, completeSent=false, watched=0, lastMedia=null, lastWall=null;
    const progressSent=new Set();
    function now(){ return window.performance && performance.now ? performance.now() : Date.now(); }
    function reset(){ lastMedia=null; lastWall=null; }
    function qualified(){ return viewSent && halfVisible && document.visibilityState !== 'hidden' && !video.paused && !video.ended && video.readyState>=2 && Number.isFinite(video.duration) && video.duration>0; }
    function sample(){ if(!qualified()){reset();return;} lastMedia=video.currentTime; lastWall=now(); }
    if ('IntersectionObserver' in window) {
      const observer=new IntersectionObserver(function(entries){ const e=entries[0]; if(!e)return; halfVisible=e.isIntersecting && e.intersectionRatio>=.5; if(halfVisible){ if(!viewSent && timer===null){ timer=window.setTimeout(function(){ if(!halfVisible||viewSent)return; viewSent=true; timer=null; sendEvent('video_view',baseParameters); sample(); },1000);} else if(viewSent) sample(); } else { if(timer!==null){window.clearTimeout(timer);timer=null;} reset(); } },{threshold:[0,.5,1]});
      observer.observe(video);
    }
    video.addEventListener('timeupdate',function(){ if(!qualified()){reset();return;} const mt=video.currentTime, wt=now(); if(lastMedia===null||lastWall===null){lastMedia=mt;lastWall=wt;return;} let md=mt-lastMedia; if(md<0 && video.loop) md=(video.duration-lastMedia)+mt; const wd=Math.max(0,(wt-lastWall)/1000); lastMedia=mt;lastWall=wt; if(md<=0||wd<=0)return; watched+=Math.min(md,wd+.25); [25,50,75].forEach(function(m){ if(watched>=video.duration*(m/100)&&!progressSent.has(m)){progressSent.add(m);sendEvent('video_progress',Object.assign({},baseParameters,{video_percent:m}));}}); if(watched>=video.duration*.9&&!completeSent){completeSent=true;sendEvent('video_complete',Object.assign({},baseParameters,{video_percent:100}));} });
    ['pause','waiting','stalled','seeking','ended','emptied'].forEach(function(n){video.addEventListener(n,reset);});
    ['play','playing','seeked','loadedmetadata'].forEach(function(n){video.addEventListener(n,sample);});
    document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='hidden') reset(); else sample(); });
  }
  function trackProductVideos(){ document.querySelectorAll('video[data-analytics-video]').forEach(trackVideo); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',trackProductVideos,{once:true}); else trackProductVideos();
})();
