import { differenceInDays } from "date-fns";

import { api } from "@/shared/api";
import { calculateRentCost } from "@/shared/api/seasons.ts";
import { parseDateTime } from "@/shared/lib/dates.ts";
import { formatPrice } from "@/shared/lib/format-price";

const INSURANCE_PERCENTAGE = 30;

const calculateInsurancePrice = (rentPrice: number): number => {
  return (rentPrice * INSURANCE_PERCENTAGE) / 100;
};

const getDeliveryPrice = async ({
  locationName,
}: {
  locationName: string;
}): Promise<number> => {
  const location = await api.areas.getOneByName({ name: locationName });

  return location.price_delivery_value;
};

export interface Price {
  rentPrice: string;
  carPricePerDay: string;
  carDeposit: string;
  locationFromPrice: string;
  locationToPrice: string;
  deliveryPrice: string;
  days: number;
  total: string;
  insurancePrice: string;
}

export const getPrice = async ({
  carId,
  locationFrom,
  locationTo,
  startDateTime,
  endDateTime,
  withInsurance,
}: {
  carId: string;
  locationFrom: string;
  locationTo: string;
  startDateTime: string;
  endDateTime: string;
  withInsurance: boolean;
}): Promise<Price> => {
  const car = await api.cars.getOne({ id: carId });
  const carPricePerDay = car.pricePerDay;
  const carDeposit = car.deposit;

  const locationFromPrice = await getDeliveryPrice({
    locationName: locationFrom,
  });

  const locationToPrice = await getDeliveryPrice({
    locationName: locationTo,
  });

  const deliveryPrice = locationFromPrice + locationToPrice;

  const days = differenceInDays(
    parseDateTime(endDateTime),
    parseDateTime(startDateTime),
  );

  let insurancePrice = 0;

  const rentPrice = calculateRentCost(
    parseDateTime(startDateTime),
    parseDateTime(endDateTime),
    carPricePerDay,
  );

  if (withInsurance) {
    insurancePrice = calculateInsurancePrice(rentPrice);
  }

  const totalPrice = rentPrice + deliveryPrice + insurancePrice;

  return {
    rentPrice: formatPrice(rentPrice),
    carPricePerDay: formatPrice(rentPrice / days),
    carDeposit: formatPrice(carDeposit),
    locationFromPrice: formatPrice(locationFromPrice),
    locationToPrice: formatPrice(locationToPrice),
    deliveryPrice: formatPrice(deliveryPrice),
    days: days,
    total: formatPrice(totalPrice),
    insurancePrice: formatPrice(insurancePrice),
  };
};

export const getPromotion = async ({
  promotionId,
  locationFrom,
  locationTo,
  startDateTime,
  endDateTime,
  withInsurance,
}: {
  promotionId: string;
  locationFrom: string;
  locationTo: string;
  startDateTime: string;
  endDateTime: string;
  withInsurance: boolean;
}): Promise<Price> => {
  const promotion = await api.cars.getOnePromotion({ id: promotionId });
  const car = promotion.car;
  const carDeposit = car.deposit;

  const locationFromPrice = await getDeliveryPrice({
    locationName: locationFrom,
  });

  const locationToPrice = await getDeliveryPrice({
    locationName: locationTo,
  });

  const deliveryPrice = locationFromPrice + locationToPrice;

  const days = differenceInDays(
    parseDateTime(endDateTime),
    parseDateTime(startDateTime),
  );

  let insurancePrice = 0;

  const rentPrice = promotion.priceTotal;
  const carPricePerDay = rentPrice / days;

  if (withInsurance) {
    insurancePrice = calculateInsurancePrice(rentPrice);
  }

  const totalPrice = rentPrice + deliveryPrice + insurancePrice;

  return {
    rentPrice: formatPrice(rentPrice),
    carPricePerDay: formatPrice(carPricePerDay),
    carDeposit: formatPrice(carDeposit),
    locationFromPrice: formatPrice(locationFromPrice),
    locationToPrice: formatPrice(locationToPrice),
    deliveryPrice: formatPrice(deliveryPrice),
    days: days,
    total: formatPrice(totalPrice),
    insurancePrice: formatPrice(insurancePrice),
  };
};
