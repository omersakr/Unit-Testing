// cart.js
let items = [];

const addItem = (item) => {
  items.push(item);
};

const getItems = () => {
  return items;
};

const clearItems = () => {
  items = [];
};

module.exports = {
  addItem,
  getItems,
  clearItems
};
