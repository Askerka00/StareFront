import { differenceInDays } from "date-fns";

import { formatDate, parseDateTime } from "@/shared/lib/dates.ts";
import { formatPrice } from "@/shared/lib/format-price.ts";

import bmwM5White from "./images/2019-bmw-5-series-540i-m-sport-design-rwd-sedan-angular-front.png";
import hondaAccordWhite from "./images/Honda-Accord-2022-white-R.webp";
import hondaHRVWhite from "./images/Honda-HRV-RS-2023-_white-R.webp";
import hondaJazzWhite from "./images/Honda-Jazz-2016-white-R.webp";
import mg5White from "./images/MG-5-2023-white-R.webp";
import mazda2White from "./images/mazda-2-sedan-grey-2024.png";
import mazda3White from "./images/Mazda-3-2022-white-R.jpg";
import toyotaFortunerWhite from "./images/toyota-fortuner-white-2019.png";
import toyotaHiluxWhite from "./images/toyota-prerunner-white-2024.png";
import toyotaVelozGray from "./images/toyota-veloz-grey-2024.png";
import toyotaViosBrown from "./images/toyota-vios-brown-2019.png";
import toyotaYarisAtivGray from "./images/toyota-yaris-ativ-grey-2024.png";
import toyotaYarisCrossWhite from "./images/Toyota-Yaris-Cross-2020-white-R.webp";
import hondaCityWhite from "./images/honda-city-white.jpg";
import mazdaCX30 from "./images/mazda-cx30-red-2023-removebg-preview.png";

export interface CarInterface {
  id: string;
  imgSrc: string;
  name: string;
  description: string;
  priceFormatted: {
    month: string;
    twoWeek: string;
    threeDays: string;
    day: string;
  };
  badge?: string;
  depositFormatted: string;
  pricePerDay: number;
  deposit: number;
  hasInstantBooking: boolean;
  hasInsurance: boolean;
  hasFreeCancelation: boolean;
  year: number;
  transmission: string;
  engineVolume: string;
}

class Car implements CarInterface {
  public readonly id: string;
  public readonly imgSrc: string;
  public readonly name: string;
  public readonly description: string;
  public readonly pricePerDay: number;
  public readonly priceFormatted: {
    month: string;
    twoWeek: string;
    threeDays: string;
    day: string;
  };
  public readonly badge?: string | undefined;
  public readonly deposit: number;
  public readonly depositFormatted: string;
  public readonly hasInstantBooking: boolean;
  public readonly hasInsurance: boolean;
  public readonly hasFreeCancelation: boolean;
  public readonly year: number;
  public readonly transmission: string;
  public readonly engineVolume: string;

  constructor({
    id,
    imgSrc,
    name,
    description,
    pricePerDay,
    badge,
    deposit,
    hasInstantBooking,
    hasInsurance,
    hasFreeCancelation,
    year,
    transmission,
    engineVolume,
  }: {
    id: string;
    imgSrc: string;
    name: string;
    description: string;
    pricePerDay: number;
    badge?: string;
    deposit: number;
    hasInstantBooking: boolean;
    hasInsurance: boolean;
    hasFreeCancelation: boolean;
    year: number;
    transmission: string;
    engineVolume: string;
  }) {
    this.id = id;
    this.imgSrc = imgSrc;
    this.name = name;
    this.description = description;
    this.pricePerDay = pricePerDay;
    this.priceFormatted = {
      day: formatPrice(pricePerDay),
      twoWeek: formatPrice(pricePerDay * 14),
      threeDays: formatPrice(pricePerDay * 3),
      month: formatPrice(pricePerDay * 30),
    };
    this.badge = badge;
    this.deposit = deposit;
    this.depositFormatted = formatPrice(deposit);
    this.hasInstantBooking = hasInstantBooking;
    this.hasInsurance = hasInsurance;
    this.hasFreeCancelation = hasFreeCancelation;
    this.year = year;
    this.transmission = transmission;
    this.engineVolume = engineVolume;
  }
}

export const getList = async (): Promise<CarInterface[]> => {
  return [
    {
      id: "019266fe-0883-7bb4-b7d7-90d3a9148306",
      imgSrc: toyotaYarisAtivGray.src,
      name: "Toyota Yaris Ativ",
      description: "1.5",
      engineVolume: "1.5",
      transmission: "car.transmission.automatic",
      price: {
        day: 72000,
      },
      deposit: 485000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2019,
      isVisible: true,
    },
    {
      id: "019266fe-15ed-7aa5-a6ae-3d29548c2c28",
      imgSrc: toyotaYarisAtivGray.src,
      name: "Toyota Yaris Ativ",
      description: "1.5",
      engineVolume: "1.5",
      transmission: "car.transmission.automatic",
      price: {
        day: 90000,
      },
      deposit: 485000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2023,
      isVisible: true,
    },
    {
      id: "019266fe-26a4-7dda-b2fb-081f4408fe85",
      imgSrc: toyotaYarisCrossWhite.src,
      name: "Toyota Yaris Cross",
      description: "1.2",
      engineVolume: "1.2",
      transmission: "car.transmission.automatic",
      price: {
        day: 145000,
      },
      deposit: 485000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: false,
      year: 2024,
      isVisible: true,
    },
    {
      id: "019266fe-33ab-7229-b577-09da52f3d238",
      imgSrc: toyotaVelozGray.src,
      name: "Toyota Veloz",
      description: "1.5",
      engineVolume: "1.5",
      transmission: "car.transmission.automatic",
      price: {
        day: 163000,
      },
      deposit: 485000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2024,
      isVisible: true,
    },
    {
      id: "019266fe-496b-7bb9-9b3a-94730439c6d7",
      imgSrc: toyotaFortunerWhite.src,
      name: "Toyota Fortuner",
      description: "2.8",
      engineVolume: "2.8",
      transmission: "car.transmission.automatic",
      price: {
        day: 220000,
      },
      deposit: 388000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2019,
      isVisible: true,
    },
    {
      id: "019266fe-5670-7aaf-b539-b4fa8ca11661",
      imgSrc: toyotaFortunerWhite.src,
      name: "Toyota Fortuner",
      description: "2.8",
      engineVolume: "2.8",
      transmission: "car.transmission.automatic",
      price: {
        day: 220000,
      },
      deposit: 485000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2023,
      isVisible: true,
    },
    {
      id: "019266fe-6242-7770-a53f-3f4e1b43a186",
      imgSrc: toyotaHiluxWhite.src,
      name: "Toyota Hilux",
      description: "2.4",
      engineVolume: "2.4",
      transmission: "car.transmission.automatic",
      price: {
        day: 324500,
      },
      deposit: 485000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: false,
      year: 2022,
      isVisible: true,
    },
    {
      id: "019266fe-6dfc-7669-8679-b73735fc4bb6",
      imgSrc: hondaJazzWhite.src,
      name: "Honda Jazz",
      description: "1.3",
      engineVolume: "1.3",
      transmission: "car.transmission.automatic",
      price: {
        day: 97000,
      },
      deposit: 485000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: false,
      year: 2024,
      isVisible: false,
    },
    {
      id: "019266fe-7b7d-7bbd-888c-d6710e499c1e",
      imgSrc: hondaCityWhite.src,
      name: "Honda City",
      description: "1.5",
      engineVolume: "1.5",
      transmission: "car.transmission.automatic",
      price: {
        day: 99000,
      },
      deposit: 485000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2024,
      isVisible: false,
    },
    {
      id: "019266fe-86ad-7ee6-8574-8dbecc893f41",
      imgSrc: hondaAccordWhite.src,
      name: "Honda Accord",
      description: "1.5",
      engineVolume: "1.5",
      transmission: "car.transmission.automatic",
      price: {
        day: 291500,
      },
      deposit: 485000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2024,
      isVisible: false,
    },
    {
      id: "019266fe-91d2-7881-8a8d-2998ffbf7d59",
      imgSrc: hondaHRVWhite.src,
      name: "Honda HRV",
      description: "1.5",
      engineVolume: "1.5",
      transmission: "car.transmission.automatic",
      price: {
        day: 260000,
      },
      deposit: 485000,
      hasInstantBooking: false,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2024,
      isVisible: false,
    },
    {
      id: "019266fe-9df5-777c-a3b5-c6ba339d131d",
      imgSrc: mg5White.src,
      name: "MG5",
      description: "1.5",
      engineVolume: "1.5",
      transmission: "car.transmission.automatic",
      price: {
        day: 77000,
      },
      deposit: 485000,
      hasInstantBooking: false,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2023,
      isVisible: true,
    },
    {
      id: "019266fe-ab44-7bbe-acd8-e3776d5ae6f8",
      imgSrc: mazda2White.src,
      name: "Mazda 2",
      description: "1.3",
      engineVolume: "1.3",
      transmission: "car.transmission.automatic",
      price: {
        day: 90000,
      },
      deposit: 485000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: false,
      year: 2024,
      isVisible: true,
    },
    {
      id: "019266fe-b881-7550-9ff0-168bcbdc8cbf",
      imgSrc: mazda3White.src,
      name: "Mazda 3",
      description: "1.3",
      engineVolume: "1.3",
      transmission: "car.transmission.automatic",
      price: {
        day: 77000,
      },
      deposit: 485000,
      hasInstantBooking: false,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2024,
      isVisible: false,
    },
    {
      id: "019266fe-c64d-7008-ad72-f66ba0fcb72c",
      imgSrc: mazdaCX30.src,
      name: "Mazda CX30",
      description: "2.5",
      engineVolume: "2.5",
      transmission: "car.transmission.automatic",
      price: {
        day: 110000,
      },
      deposit: 485000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2023,
      isVisible: true,
    },
    {
      id: "019266fe-d711-788a-bfb9-ebe5d5ad8172",
      imgSrc: bmwM5White.src,
      name: "BMW M5",
      description: "4.4",
      engineVolume: "4.4",
      transmission: "car.transmission.automatic",
      price: {
        day: 392500,
      },
      deposit: 485000,
      hasInstantBooking: false,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2024,
      isVisible: false,
    },
    {
      id: "019266fe-e218-7556-862e-1a29c36d10d6",
      imgSrc: toyotaViosBrown.src,
      name: "Toyota Vios",
      description: "1.5",
      engineVolume: "1.5",
      transmission: "car.transmission.automatic",
      price: {
        day: 90000,
      },
      deposit: 485000,
      hasInstantBooking: true,
      hasInsurance: true,
      hasFreeCancelation: true,
      year: 2019,
      isVisible: true,
    },
  ]
    .filter((item) => item.isVisible)
    .map(
      ({
        id,
        imgSrc,
        name,
        description,
        price,
        deposit,
        hasInstantBooking,
        hasInsurance,
        hasFreeCancelation,
        year,
        transmission,
        engineVolume,
      }) =>
        new Car({
          id,
          imgSrc,
          name,
          description,
          pricePerDay: price.day,
          deposit,
          hasInstantBooking,
          hasInsurance,
          hasFreeCancelation,
          year,
          transmission,
          engineVolume,
        }),
    );
};

export const getOne = async ({ id }: { id: string }): Promise<CarInterface> => {
  const list = await getList();

  // console.log({ id });

  const item = list.filter((item) => item.id === id)[0] || null;

  if (!item) {
    throw new Error(`E_NOT_FOUND`);
  }

  return item;
};

export interface Promotion {
  id: string;
  startDateTime: Date;
  endDateTime: Date;
  priceTotalFormatted: string;
  priceTotal: number;
  days: number;
  car: CarInterface;
}

export const getPromotionsList = async (): Promise<Promotion[]> => {
  return [
    {
      id: "019266ff-0706-7aaa-97a5-36631e875e3b",
      startDateTime: "08/10/2024 10:00",
      endDateTime: "31/10/2024 10:00",
      priceTotal: 1300000,
      car: await getOne({ id: "019266fe-e218-7556-862e-1a29c36d10d6" }),
    },
    {
      id: "019266ff-1071-744a-82cf-848299266f31",
      startDateTime: "08/10/2024 10:00",
      endDateTime: "31/10/2024 10:00",
      priceTotal: 2500000,
      car: await getOne({ id: "019266fe-496b-7bb9-9b3a-94730439c6d7" }),
    },
    {
      id: "019266ff-1ace-7881-9eed-8ddd1c2e11f7",
      startDateTime: "08/10/2024 10:00",
      endDateTime: "31/10/2024 10:00",
      priceTotal: 1840000,
      car: await getOne({ id: "019266fe-ab44-7bbe-acd8-e3776d5ae6f8" }),
    },
  ].map(({ id, startDateTime, endDateTime, priceTotal, car }) => {
    const days = differenceInDays(
      parseDateTime(endDateTime),
      parseDateTime(startDateTime),
    );

    return {
      id,
      startDateTime: parseDateTime(startDateTime),
      endDateTime: parseDateTime(endDateTime),
      priceTotalFormatted: formatPrice(priceTotal),
      priceTotal: priceTotal,
      days,
      car,
    };
  });
};

export const getOnePromotion = async ({
  id,
}: {
  id: string;
}): Promise<Promotion> => {
  const list = await getPromotionsList();

  const item = list.filter((item) => item.id === id)[0] || null;

  if (!item) {
    throw new Error(`E_NOT_FOUND`);
  }

  return item;
};
