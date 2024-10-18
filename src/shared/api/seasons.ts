// Ваш код с определением функций и сезонов
type Season = {
  name: string;
  start: { day: number; month: number };
  end: { day: number; month: number };
  coefficient: number;
};

// Сезоны и их коэффициенты
const seasons: Season[] = [
  {
    name: "winter_high",
    start: { day: 15, month: 12 },
    end: { day: 20, month: 1 },
    coefficient: 1.5,
  },
  {
    name: "winter_low",
    start: { day: 21, month: 1 },
    end: { day: 28, month: 2 },
    coefficient: 1.2,
  },
  {
    name: "spring_summer_fall",
    start: { day: 1, month: 3 },
    end: { day: 20, month: 10 },
    coefficient: 1.0,
  },
  {
    name: "fall",
    start: { day: 21, month: 10 },
    end: { day: 14, month: 12 },
    coefficient: 1.3,
  },
];

// Вспомогательная функция для проверки, попадает ли дата в диапазон сезона (игнорируя год)
function isDateInSeason(
  date: Date,
  start: { day: number; month: number },
  end: { day: number; month: number },
): boolean {
  const current = { day: date.getDate(), month: date.getMonth() + 1 };

  // Если сезон не переходит через Новый год
  if (
    start.month < end.month ||
    (start.month === end.month && start.day <= end.day)
  ) {
    return (
      (current.month > start.month ||
        (current.month === start.month && current.day >= start.day)) &&
      (current.month < end.month ||
        (current.month === end.month && current.day <= end.day))
    );
  }

  // Если сезон переходит через Новый год
  return (
    current.month > start.month ||
    (current.month === start.month && current.day >= start.day) ||
    current.month < end.month ||
    (current.month === end.month && current.day <= end.day)
  );
}

// Функция для получения коэффициента сезона для конкретной даты
function getSeasonCoefficient(date: Date): number {
  for (const season of seasons) {
    if (isDateInSeason(date, season.start, season.end)) {
      return season.coefficient;
    }
  }
  throw new Error("Сезон для данной даты не найден");
}

function roundUpToHundredThousand(num: number): number {
  return Math.ceil(num / 10000) * 10000;
}

// Функция для расчета итоговой стоимости аренды
export function calculateRentCost(
  startDate: Date,
  endDate: Date,
  dailyRate: number,
): number {
  // Проверяем, есть ли сезон для даты начала
  if (
    !isDateInSeason(startDate, seasons[0].start, seasons[0].end) &&
    !isDateInSeason(startDate, seasons[1].start, seasons[1].end) &&
    !isDateInSeason(startDate, seasons[2].start, seasons[2].end) &&
    !isDateInSeason(startDate, seasons[3].start, seasons[3].end)
  ) {
    throw new Error("Сезон для даты начала не найден");
  }

  // Проверяем, есть ли сезон для даты окончания
  if (
    !isDateInSeason(endDate, seasons[0].start, seasons[0].end) &&
    !isDateInSeason(endDate, seasons[1].start, seasons[1].end) &&
    !isDateInSeason(endDate, seasons[2].start, seasons[2].end) &&
    !isDateInSeason(endDate, seasons[3].start, seasons[3].end)
  ) {
    throw new Error("Сезон для даты окончания не найден");
  }

  let totalCost = 0;

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d);
    const coefficient = getSeasonCoefficient(currentDate);
    totalCost += dailyRate * coefficient;
  }

  return roundUpToHundredThousand(totalCost);
}
