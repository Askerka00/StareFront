class Car extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const id = this.dataset.id ?? "";

    const priceTotalElement = this.querySelector(
      "[data-price-total]",
    ) as HTMLElement;
    const daysElement = this.querySelector("[data-days]") as HTMLElement;

    // searchFormChangedEvent.subscribe(async () => {
    //   console.log("calculate", { id });
    //
    //   console.log({
    //     locationFrom: locationFromChangedEvent.value,
    //     locationTo: locationToChangedEvent.value,
    //     startDateTime: startDateTimeChangedEvent.value,
    //     endDateTime: endDateTimeChangedEvent.value,
    //   });
    //
    //   const formatDate = (dateStr: string) => {
    //     return parse(dateStr, "dd/MM/yyyy hh:mm", new Date());
    //   };
    //
    //   const price = await api.checkout.getPrice({
    //     carId: id,
    //     locationFrom: locationFromChangedEvent.value,
    //     locationTo: locationToChangedEvent.value,
    //     startDateTime: formatDate(startDateTimeChangedEvent.value),
    //     endDateTime: formatDate(endDateTimeChangedEvent.value),
    //     withInsurance: true,
    //   });
    //
    //   priceTotalElement.innerText = price.total;
    //   daysElement.innerText = price.days.toString();
    //
    //   console.log({ price });
    // });
  }
}

customElements.define("wc-car", Car);
