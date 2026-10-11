// Shared page reveal + navigation for all Page_ / UIUX_ pages.
(function () {
  const DARK = '#1B1C20', LIGHT = '#ebebeb';
  const waitNav = () => window.__navReady ? null : new Promise(r => window.addEventListener('nav-ready', r, { once: true }));
  const waitImg = (i) => i.complete ? null : new Promise(r => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); });
  function playHero() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = document.querySelector('[data-enter="hero"]');
    if (hero) hero.animate([{ opacity: 0, transform: 'scale(1.06)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 1200, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' });
  }
  window.PT = {
    mount(c, opts) {
      const o = opts || {};
      let done = false;
      const show = () => {
        if (done) return; done = true;
        clearTimeout(c._fallback);
        c.setState({ loaded: true });
        if (o.hero) playHero();
      };
      const reveal = () => Promise.all([waitNav(), document.fonts ? document.fonts.ready : null])
        .then(() => Promise.all([...document.images].filter(i => i.loading !== 'lazy' && i.getBoundingClientRect().top < window.innerHeight).map(waitImg)))
        .then(() => { if (window.__ptFinish) window.__ptFinish(show); else requestAnimationFrame(() => requestAnimationFrame(show)); });
      if (document.readyState === 'complete') reveal(); else window.addEventListener('load', reveal, { once: true });
      c._fallback = setTimeout(show, document.getElementById('pt-loader') ? 22000 : (o.fallback || 6000));
      window.addEventListener('pageshow', (e) => { if (e.persisted) c.setState({ leaving: false, loaded: true }); });
    },
    cover(c, bg) {
      const { leaving, loaded, coverBg } = c.state;
      return { coverBg: coverBg || bg || DARK, leaveOpacity: leaving ? 1 : 0, coverOpacity: loaded ? 0 : 1, coverPointer: (leaving || !loaded) ? 'auto' : 'none' };
    },
    bgFor(url) {
      const name = decodeURIComponent(url).split('/').pop();
      return name.startsWith('UIUX_') ? DARK : LIGHT;
    },
    homeUrl() { return /github\.io$/.test(location.hostname) ? './' : 'Page_Home.dc.html'; },
    navigate(c, url) {
      if (url === 'Page_Home.dc.html') url = this.homeUrl();
      c.setState({ leaving: true, coverBg: this.bgFor(url) });
      setTimeout(() => { window.location.href = url; }, 320);
    }
  };
})();
