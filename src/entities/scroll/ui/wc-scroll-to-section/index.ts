import { scrollToEvent } from "../../model";

class ScrollToSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const section = this.dataset.section;

    scrollToEvent.subscribe(({ scrollTo }) => {
      if (scrollTo === section) {
        this.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  }
}

customElements.define("wc-scroll-to-section", ScrollToSection);
