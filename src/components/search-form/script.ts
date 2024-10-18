import flatpickr from "flatpickr";

import {
  $endDateTimeFormatted,
  $locationFrom,
  $locationTo,
  $returnDifferent,
  $startDateTime,
  $startDateTimeFormatted,
  endDateTimeChanged,
  locationFromChanged,
  locationToChanged,
  returnDifferentChanged,
  startDateTimeChanged,
} from "@/entities/model";

import { DATES } from "@/shared/config";
import { getDateTime } from "@/shared/lib/dates";

const flatpickrRentalDates = flatpickr("[data-rental-dates]", {
  minDate: "today",
  mode: "range",
  dateFormat: "d/m/Y",
  disableMobile: true,
  altInput: true,
  altFormat: "d/m/Y",
  defaultHour: DATES.DEFAULT_TIME.hours,
  defaultMinute: DATES.DEFAULT_TIME.minutes,
  defaultDate: [
    $startDateTimeFormatted.getState(),
    $endDateTimeFormatted.getState(),
  ],
  onChange: function (selectedDates, dateStr) {
    // console.log({ selectedDates, dateStr });
    if (selectedDates.length === 2) {
      const [from, to] = selectedDates;

      const startDateTime = getDateTime(from, 0);
      startDateTimeChanged(startDateTime);

      const endDateTime = getDateTime(to, 0);
      endDateTimeChanged(endDateTime);

      // console.log({ startDateTime, endDateTime });
    }
  },
});

//
// const fStartDateTime = flatpickr("[data-start-date-time]", {
//   minDate: "today",
//   enableTime: true,
//   dateFormat: "d/m/Y H:i",
//   disableMobile: true,
//   time_24hr: true,
//   defaultHour: 10,
//   defaultMinute: 0,
// });
//
// const fEndDateTime = flatpickr("[data-end-date-time]", {
//   minDate: "today",
//   enableTime: true,
//   dateFormat: "d/m/Y H:i",
//   disableMobile: true,
//   time_24hr: true,
//   defaultHour: 10,
//   defaultMinute: 0,
// });

class SearchForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const dataLocationFromElement = this.querySelector(
      "[data-location-from]",
    ) as HTMLElement;
    const dataLocationFromClassName =
      dataLocationFromElement.dataset.className!;

    const dataLocationGroupToElement = this.querySelector(
      "[data-location-to-group]",
    ) as HTMLElement;
    const hiddenClassName = dataLocationGroupToElement.dataset
      .className as string;

    $returnDifferent.watch((checked) => {
      if (checked) {
        dataLocationGroupToElement.classList.remove(hiddenClassName);
        dataLocationFromElement.classList.remove(dataLocationFromClassName);
      } else {
        dataLocationGroupToElement.classList.add(hiddenClassName);
        dataLocationFromElement.classList.add(dataLocationFromClassName);
      }
    });

    // // Start date time
    // const startDateTimeElement = this.querySelector(
    //   "[data-start-date-time]",
    // ) as HTMLInputElement;
    //
    // startDateTimeElement.addEventListener("change", (event) => {
    //   const { value } = event.target as HTMLInputElement;
    //
    //   startDateTimeChanged(parseDateTime(value));
    // });
    //
    // // End date time
    // const endDateTimeElement = this.querySelector(
    //   "[data-end-date-time]",
    // ) as HTMLInputElement;
    //
    // endDateTimeElement.addEventListener("change", (event) => {
    //   const { value } = event.target as HTMLInputElement;
    //
    //   endDateTimeChanged(parseDateTime(value));
    // });
    //
    // $startDateFormatted.watch((startDateFormatted) => {
    //   startDateTimeElement.value = startDateFormatted;
    //   // @ts-ignore
    //   fStartDateTime.setDate(startDateFormatted, true);
    //   // @ts-ignore
    //   fEndDateTime.set("minDate", startDateFormatted);
    // });
    //
    // $endDateFormatted.watch((endDateFormatted) => {
    //   endDateTimeElement.value = endDateFormatted;
    //   // @ts-ignore
    //   fEndDateTime.setDate(endDateFormatted, true);
    // });
  }
}

customElements.define("wc-search-form", SearchForm);

class Switcher extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const inputCheckboxElement = this.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;

    $returnDifferent.watch((returnDifferent) => {
      inputCheckboxElement.checked = returnDifferent;
    });

    const handleChange = (event: Event) => {
      const currentTarget = event.target as HTMLInputElement;

      returnDifferentChanged(currentTarget.checked);
    };
    inputCheckboxElement.addEventListener("change", handleChange);
  }
}

customElements.define("wc-switcher", Switcher);

class StartDateTime extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const element = this.querySelector("input");

    if (element) {
      $startDateTimeFormatted.watch((dateTime) => {
        element.value = dateTime;
      });
    }
  }
}

customElements.define("wc-start-date-time", StartDateTime);

class EndDateTime extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const element = this.querySelector("input");

    if (element) {
      $endDateTimeFormatted.watch((dateTime) => {
        element.value = dateTime;
      });
    }
  }
}

customElements.define("wc-end-date-time", EndDateTime);

class LocationFromSelect extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const element = this.querySelector("select");

    if (element) {
      $locationFrom.watch((locationFrom) => {
        element.value = locationFrom;
      });

      element.addEventListener("change", (event) => {
        const { value } = event.target as HTMLSelectElement;
        locationFromChanged(value);
      });
    }
  }
}

customElements.define("wc-location-from", LocationFromSelect);

class LocationToSelect extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const element = this.querySelector("select");

    if (element) {
      $locationTo.watch((locationTo) => {
        element.value = locationTo;
      });

      element.addEventListener("change", (event) => {
        const { value } = event.target as HTMLSelectElement;
        locationToChanged(value);
      });
    }
  }
}

customElements.define("wc-location-to", LocationToSelect);
