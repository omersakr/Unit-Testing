
const { addItem, getItems, clearItems } = require('./cart');

describe('Shopping Cart - Lifecycle Hooks', () => {
  
beforeEach
  beforeEach(() => {
    clearItems();
  });

//afterEach
  afterEach(() => {
    clearItems();
  });

  test('should have 1 item after adding 1 item', () => {
    addItem('Apple');
    expect(getItems()).toHaveLength(1);
    expect(getItems()).toEqual(['Apple']);
  });

  test('should have 2 items after adding 2 items', () => {
    addItem('Banana');
    addItem('Orange');
    expect(getItems()).toHaveLength(2);
    expect(getItems()).toEqual(['Banana', 'Orange']);
  });

  test('should start with empty cart', () => {
    expect(getItems()).toHaveLength(0);
    expect(getItems()).toEqual([]);
  });
});
