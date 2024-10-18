import { add, format, parse, set } from "date-fns";

import { DATES } from "@/shared/config";

export const getDateTime = (from: Date, days: number) => {
  return add(set(from, DATES.DEFAULT_TIME), {
    days,
  });
};
export const parseDateTime = (dateStr: string): Date => {
  return parse(dateStr, DATES.DATE_TIME_FORMAT, DATES.now);
};
export const parseTime = (dateStr: string): Date => {
  return parse(dateStr, DATES.TIME_FORMAT, DATES.now);
};
export const formatDateTime = (date: Date): string => {
  return format(date, DATES.DATE_TIME_FORMAT);
};
export const formatDate = (date: Date): string => {
  return format(date, DATES.DATE_FORMAT);
};
export const formatTime = (date: Date): string => {
  return format(date, DATES.TIME_FORMAT);
};
