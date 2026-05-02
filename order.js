const { getDiscount } = require('./pricing');

const calculatePrice = (price) => {
  const discount = getDiscount();
  return price - (price * discount);
};

module.exports = {
  calculatePrice
};
