// Measure the rendered script after fonts load; shrink only when a full name needs it.
(() => {
  const names = [...document.querySelectorAll('.brand, .hero-person, .person, .profile-person, .nowrap-name')]
    .filter(el => !el.parentElement.closest('.brand, .hero-person, .person, .profile-person, .nowrap-name'));
  let frame;
  function fitNames() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      names.forEach(el => { el.style.fontSize = ''; });
      names.forEach(el => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const natural = range.getBoundingClientRect().width;
        const container = el.matches('.brand, .hero-person, .person, .profile-person') ? el : el.parentElement;
        const style = getComputedStyle(container);
        const available = container.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        if (available > 0 && natural > available) {
          el.style.fontSize = `${parseFloat(getComputedStyle(el).fontSize) * (available - 1) / natural}px`;
        }
      });
    });
  }
  fitNames();
  if (document.fonts) {
    document.fonts.ready.then(fitNames);
    document.fonts.addEventListener('loadingdone', fitNames);
  }
  window.addEventListener('resize', fitNames);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(fitNames);
    names.forEach(el => observer.observe(el.parentElement));
  }
})();
