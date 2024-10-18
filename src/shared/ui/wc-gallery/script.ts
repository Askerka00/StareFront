import type { Callback } from "@/shared/lib/event-bus";
import { bus } from "@/shared/lib/event-bus";

export const nextItemEvent = {
  subscribe: (callback: Callback<void>) => bus.subscribe("next-item", callback),
  broadcast: () => bus.broadcast("next-item"),
};

export const prevItemEvent = {
  subscribe: (callback: Callback<void>) => bus.subscribe("prev-item", callback),
  broadcast: () => bus.broadcast("prev-item"),
};

class GalleryNext extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const buttonElement = this.querySelector("button")!;

    buttonElement.addEventListener("click", () => {
      nextItemEvent.broadcast();
    });
  }
}

customElements.define("wc-gallery-next", GalleryNext);

class GalleryPrev extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const buttonElement = this.querySelector("button")!;

    buttonElement.addEventListener("click", () => {
      prevItemEvent.broadcast();
    });
  }
}

customElements.define("wc-gallery-prev", GalleryPrev);

class Gallery extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const scroller = this.querySelector("[data-gallery-scroller]")!;
    const itemSize = scroller.querySelector("[data-gallery-item]")!.clientWidth;

    nextItemEvent.subscribe(() => {
      scroller.scrollBy(itemSize, 0);
    });

    prevItemEvent.subscribe(() => {
      scroller.scrollBy(-itemSize, 0);
    });
  }
}

customElements.define("wc-gallery", Gallery);
