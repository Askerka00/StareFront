export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("th-TH").format(price / 100);
};
