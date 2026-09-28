export const getDiscountedPrice = (product) => {
  const price = Number(product?.price) || 0;
  const discountPercentage = Number(product?.discountPercentage) || 0;
  return Number((price * (1 - discountPercentage / 100)).toFixed(2));
};