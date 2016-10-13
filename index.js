import Link from './src/link';
import exclusions from './src/exclusions';
import { containsNone, throttle } from './src/utils';
import highlightLinks from './src/debug';

let links;

function getContainerLinks(container) {
  const urls = [];
  const currentPath = window.location.pathname;
  return Array.from(container.getElementsByTagName('a'))
    .map((el) => {
      const url = el.attributes.href.value;
      if (containsNone(url, exclusions) && url !== currentPath) {
        urls.push(url);
        return new Link(el);
      }
      return undefined;
    }).filter(link => link);
}

function onMove(e) {
  const candidates = links.filter(link => link.visible);
  const measures = candidates.map(link => link.getMeasurement(e));
  if (measures.length === 0) {
    return;
  }
  measures.sort((a, b) => {
    if (a.cycles < 0 || b.cycles < 0) return b.cycles - a.cycles;
    return a.cycles - b.cycles;
  });


  const best = measures.shift();
  if (best.speed > 0) {
    if (best.distance < 100) {
      best.link.prerender();
    } else {
      best.link.promote();
    }
  }

  measures.forEach(measure => {
    if (measure.distance < 100) {
      measure.link.prerender();
    } else if (measure.speed < 0) {
      measure.link.demote();
    }
  });
}

function watchIntent() {
  document.addEventListener('mousemove', throttle(onMove, 25), false);
}

function init(options = { container: document, debug: false }) {
  links = getContainerLinks(options.container);
  if (options.debug) {
    highlightLinks();
  }

  watchIntent(links);
}

export default { init };
