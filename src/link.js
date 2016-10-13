export default class Link {
  constructor(el) {
    this.el = el;
    this.minPromotions = 10;
    this.promotions = 0;
    this.prerendered = false;
  }

  prerender() {
    const link = document.createElement('link');
    link.setAttribute('rel', 'prerender');
    link.setAttribute('href', this.href);
    document.body.appendChild(link);
    this.el.setAttribute('data-prerendered', '');
    this.prerendered = true;
  }

  get position() {
    return this.el.getBoundingClientRect();
  }

  get x() {
    return this.position.left + (this.width / 2);
  }

  get y() {
    return this.position.top + (this.height / 2);
  }

  get width() {
    return this.position.width;
  }

  get height() {
    return this.position.width;
  }

  get visible() {
    const viewportH = document.documentElement.clientHeight;
    return this.x >= 0 && this.y >= 0 && this.y <= viewportH && this.width > 0 && !this.prerendered;
  }

  get href() {
    return this.el.attributes.href.value;
  }

  promote() {
    this.promotions++;

    if (this.promotions === this.minPromotions) {
      this.prerender();
    }
  }

  demote() {
    if (this.promotions > 0) {
      this.promotions--;
    }
  }

  getMeasurement(e) {
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    const distance = Math.floor(Math.sqrt(Math.pow(mouseX - this.x, 2) +
      Math.pow(mouseY - this.y, 2)));

    let relative = 0;
    let speed = 0;
    let cycles;
    if (this.prevDistance !== undefined) {
      speed = this.prevDistance - distance;
      relative = distance / this.prevDistance;
      cycles = distance / speed;
    }
    this.prevDistance = distance;
    return {
      distance,
      speed,
      cycles,
      relative,
      href: this.href,
      link: this
    };
  }
}
