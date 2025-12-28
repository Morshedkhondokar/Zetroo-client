export const getFinalPrice = (price, discount = 0) => {
  if (discount > 0) {
    return Math.round(price - (price * discount) / 100);
  }
  return Math.round(price);
};
