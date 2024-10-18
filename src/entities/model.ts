import { createEvent, createStore } from "effector";

import { DATES } from "@/shared/config";
import { formatDateTime, getDateTime } from "@/shared/lib/dates";

export const defaultLocationFrom = "Airport Phuket";
export const defaultLocationTo = "Airport Phuket";

const defaultReturnDifferent = false;

export const defaultStartDateTime = getDateTime(
  DATES.now,
  DATES.DAYS_START_FROM_CURRENT,
);
export const defaultEndDateTime = getDateTime(
  defaultStartDateTime,
  DATES.DAYS_RENT_PERIOD_MINIMUM,
);

export const $locationFrom = createStore(defaultLocationFrom);
export const $locationTo = createStore(defaultLocationTo);
export const $returnDifferent = createStore(defaultReturnDifferent);
export const $startDateTime = createStore<Date>(defaultStartDateTime);
export const $startDateTimeFormatted = $startDateTime.map(formatDateTime);
export const $endDateTime = createStore<Date>(defaultEndDateTime);
export const $endDateTimeFormatted = $endDateTime.map(formatDateTime);

export const locationFromChanged = createEvent<string>();
export const locationToChanged = createEvent<string>();
export const returnDifferentChanged = createEvent<boolean>();
export const startDateTimeChanged = createEvent<Date>();
export const endDateTimeChanged = createEvent<Date>();

$locationFrom.on(locationFromChanged, (_, locationFrom) => locationFrom);
$locationTo.on(locationToChanged, (_, locationTo) => locationTo);
$returnDifferent.on(
  returnDifferentChanged,
  (_, returnDifferent) => returnDifferent,
);
$startDateTime.on(startDateTimeChanged, (_, startDateTime) => startDateTime);
$endDateTime.on(endDateTimeChanged, (_, endDateTime) => endDateTime);
