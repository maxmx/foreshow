export default function highlightLinks() {
  const css = '[data-prerendered] { text-shadow: 0 0 10px #00ff00; }';
  const style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.head.appendChild(style);
}
