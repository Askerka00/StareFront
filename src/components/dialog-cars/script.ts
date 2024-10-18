import { scrollToEvent } from "@/entities/scroll";

import { SECTIONS, TELEGRAM_LINK } from "@/shared/config";

class ApplyForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const formElement = this.querySelector("form")!;
    const submitButtonElement = formElement.querySelector(
      "button[type='submit']",
    )!;

    const needToHideElements = this.querySelectorAll("[data-hide]")!;
    const headingElement = this.querySelector("[data-heading]") as HTMLElement;
    const supportingTextElement = this.querySelector(
      "[data-supporting-text]",
    ) as HTMLElement;
    // const badgeElement = this.querySelector("[data-badge]") as HTMLElement;

    // const locationFromInputElement = formElement.querySelector(
    //   "[data-input-location-from]",
    // ) as HTMLInputElement;
    //
    // locationFromChangedEvent.subscribe(({ value }) => {
    //   console.log("locationFromChangedEvent", { value });
    //   locationFromInputElement.value = value;
    // });
    //
    // const locationToInputElement = formElement.querySelector(
    //   "[data-input-location-to]",
    // ) as HTMLInputElement;
    //
    // locationToChangedEvent.subscribe(({ value }) => {
    //   console.log("locationToChangedEvent", { value });
    //   locationToInputElement.value = value;
    // });
    //
    // const startDateTimeInputElement = formElement.querySelector(
    //   "[data-input-start-date-time]",
    // ) as HTMLInputElement;
    // startDateTimeChangedEvent.subscribe(({ value }) => {
    //   console.log("startDateTimeChangedEvent", { value });
    //   startDateTimeInputElement.value = value;
    // });
    //
    // const endDateTimeInputElement = formElement.querySelector(
    //   "[data-input-end-date-time]",
    // ) as HTMLInputElement;
    // endDateTimeChangedEvent.subscribe(({ value }) => {
    //   console.log("endDateTimeChangedEvent", { value });
    //   endDateTimeInputElement.value = value;
    // });

    const handleResult = ({
      // type,
      heading,
      supportingText,
    }: {
      type: "success" | "fail";
      heading: string;
      supportingText?: string;
    }) => {
      headingElement.textContent = heading;

      if (supportingText) {
        supportingTextElement.innerHTML = supportingText;
      }

      // badgeElement.classList.add(type);

      needToHideElements.forEach((item) => {
        item.classList.add("hidden");
      });
      formElement.remove();

      scrollToEvent.broadcast({ scrollTo: SECTIONS.APPLY });
    };

    const handleFormSubmit = async (event: HTMLElementEventMap["submit"]) => {
      event.preventDefault();

      submitButtonElement.setAttribute("disabled", "");

      const formData = new FormData(event.target as HTMLFormElement);

      // formData.set("locationFrom", locationFromChangedEvent.value);
      // formData.set("locationTo", locationToChangedEvent.value);
      // formData.set("startDateTime", startDateTimeChangedEvent.value);
      // formData.set("endDateTime", endDateTimeChangedEvent.value);

      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      submitButtonElement.removeAttribute("disabled");

      if (response.ok) {
        handleResult({
          type: "success",
          heading: "Благодарим!",
          supportingText: "Заявка успешно отправлена",
        });
      } else {
        const data = await response.json();
        // @ts-ignore
        console.error(data.message);

        handleResult({
          type: "fail",
          heading: "Произошла ошибка",
          supportingText: `Напишите нам в <a class="link" href='${TELEGRAM_LINK}'>Телеграм</a>`,
        });
      }
    };

    formElement.addEventListener("submit", handleFormSubmit);
  }
}

customElements.define("wc-apply-form", ApplyForm);
