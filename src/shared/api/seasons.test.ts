import { describe, expect, it } from "vitest";

import { calculateRentCost } from "@/shared/api/seasons.ts";

// Тесты
describe("calculateRentCost", () => {
  it("should calculate the correct cost for a single season", () => {
    const startDate = new Date("2025-03-01"); // Начало в весенне-летнем сезоне
    const endDate = new Date("2025-03-05"); // Окончание в весенне-летнем сезоне
    const dailyRate = 100;

    const totalCost = calculateRentCost(startDate, endDate, dailyRate);
    expect(totalCost).toBe(500); // 5 дней * 100 (ставка) * 1.0 (коэффициент)
  });

  it("should calculate the correct cost across seasons", () => {
    const startDate = new Date("2025-02-25"); // Начало в зимнем низком сезоне
    const endDate = new Date("2025-03-05"); // Окончание в весенне-летнем сезоне
    const dailyRate = 100;

    const totalCost = calculateRentCost(startDate, endDate, dailyRate);
    // 4 дня * 1.2 (коэффициент зимнего низкого сезона) + 5 дней * 1.0 (коэффициент весенне-летнего сезона)
    expect(totalCost).toBe(980); // (4 * 100 * 1.2) + (5 * 100 * 1.0) = 980
  });

  it("should throw an error if the date is outside the defined seasons", () => {
    const startDate = new Date("2025-11-01"); // Дата вне сезонов
    const endDate = new Date("2025-11-05"); // Дата вне сезонов
    const dailyRate = 100;

    // Проверяем, что будет выброшена ошибка
    expect(() => {
      calculateRentCost(startDate, endDate, dailyRate);
    }).toThrow("Сезон для даты начала не найден");
  });

  it("should calculate the cost correctly for a full winter season", () => {
    const startDate = new Date("2025-12-15"); // Начало в зимнем высоком сезоне
    const endDate = new Date("2026-01-20"); // Окончание в зимнем высоком сезоне
    const dailyRate = 100;

    const totalCost = calculateRentCost(startDate, endDate, dailyRate);
    // 37 дней в зимнем высоком сезоне с коэффициентом 1.5
    expect(totalCost).toBe(5550); // 37 * 100 * 1.5 = 5550
  });
});
