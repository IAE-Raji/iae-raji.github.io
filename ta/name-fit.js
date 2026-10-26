// Keep the complete Tamil name on one line, including narrow screens.
function fitTamilNames() {
  document.querySelectorAll(".nowrap-name").forEach((el) => {
    el.style.fontSize = "";
    const parent = el.parentElement;
    if (!parent) return;
    const available = parent.clientWidth;
    const natural = el.getBoundingClientRect().width;
    if (available > 0 && natural > available) {
      const size = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${size * available / natural * 0.98}px`;
    }
  });
}
document.addEventListener("DOMContentLoaded", fitTamilNames);
if (document.fonts) document.fonts.ready.then(fitTamilNames);
window.addEventListener("resize", fitTamilNames);
