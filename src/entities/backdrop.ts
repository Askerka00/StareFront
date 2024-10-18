const backdropElements = Array.from(
  document.querySelectorAll("[data-backdrop]"),
) as HTMLElement[];

const handleScroll = () => {
  backdropElements.forEach((backdropElement: HTMLElement) => {
    const className = backdropElement.dataset.className!;
    const { scrollTop } = document.documentElement;

    if (scrollTop === 0) {
      backdropElement.classList.remove(className);
    } else if (scrollTop > 0) {
      backdropElement.classList.add(className);
    }
  });
};

document.addEventListener("scroll", handleScroll);
