import {
  endDateTimeChanged,
  locationFromChanged,
  locationToChanged,
  returnDifferentChanged,
  startDateTimeChanged,
} from "@/entities/model";

import { parseDateTime } from "@/shared/lib/dates";

const searchParams = new URLSearchParams(window.location.search);

const locationFrom = searchParams.get("locationFrom") ?? null;
if (locationFrom) {
  locationFromChanged(locationFrom);
}

const locationTo = searchParams.get("locationTo") ?? null;
if (locationTo) {
  locationToChanged(locationTo);
}

const returnDifferent =
  searchParams.has("returnDifferent") &&
  searchParams.get("locationFrom") !== searchParams.get("locationTo");
if (returnDifferent) {
  returnDifferentChanged(returnDifferent);
}

const startDateTime =
  searchParams.has("startDateTime") && searchParams.get("startDateTime") !== ""
    ? parseDateTime(searchParams.get("startDateTime") ?? "")
    : null;
if (startDateTime) {
  startDateTimeChanged(startDateTime);
}

const endDateTime =
  searchParams.has("endDateTime") && searchParams.get("endDateTime") !== ""
    ? parseDateTime(searchParams.get("endDateTime") ?? "")
    : null;
if (endDateTime) {
  endDateTimeChanged(endDateTime);
}
