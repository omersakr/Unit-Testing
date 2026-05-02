const { calculatePrice } = require('./order');
const pricing = require('./pricing');

// Mock
jest.mock('./pricing');

describe('Order Price Calculation', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should apply 50% discount correctly', () => {

    pricing.getDiscount.mockReturnValue(0.5);
    
    const result = calculatePrice(100);
    
    expect(result).toBe(50);
    expect(pricing.getDiscount).toHaveBeenCalled();
    expect(pricing.getDiscount).toHaveBeenCalledTimes(1);
  });

  test('should apply 20% discount correctly', () => {
    pricing.getDiscount.mockReturnValue(0.2);
    
    const result = calculatePrice(100);
    
    expect(result).toBe(80);
    expect(pricing.getDiscount).toHaveBeenCalled();
  });

  test('should apply no discount when discount is 0', () => {
    pricing.getDiscount.mockReturnValue(0);
    
    const result = calculatePrice(100);
    
    expect(result).toBe(100);
    expect(pricing.getDiscount).toHaveBeenCalled();
  });

  test('should handle decimal prices', () => {
    pricing.getDiscount.mockReturnValue(0.5);
    
    const result = calculatePrice(99.99);
    
    expect(result).toBeCloseTo(49.995);
    expect(pricing.getDiscount).toHaveBeenCalled();
  });
});
