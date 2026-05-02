const { ProductService } = require('./product.service');

describe('ProductService', () => {
  let mockDb;
  let productService;

  beforeEach(() => {
    // Mock
    mockDb = {
      find: jest.fn(),
      insert: jest.fn()
    };
    
    productService = new ProductService(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProduct', () => {
    
    test('should call db.find with correct id', async () => {
      // Setup
      const productId = '123';
      const mockProduct = { id: '123', name: 'Laptop' };
      mockDb.find.mockResolvedValue(mockProduct);

      // Execute
      const result = await productService.getProduct(productId);

      // Assert
      expect(mockDb.find).toHaveBeenCalledWith(productId);
      expect(mockDb.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProduct);
    });

    test('should handle db.find failure', async () => {
      // Setup
      const productId = '999';
      const error = new Error('Product not found');
      mockDb.find.mockRejectedValue(error);

      // Execute & Assert
      await expect(productService.getProduct(productId)).rejects.toThrow('Product not found');
      expect(mockDb.find).toHaveBeenCalledWith(productId);
    });

  });

  describe('createProduct', () => {
    
    test('should call db.insert with correct product', async () => {
      // Setup
      const newProduct = { name: 'Phone', price: 500 };
      const insertedProduct = { id: '456', ...newProduct };
      mockDb.insert.mockResolvedValue(insertedProduct);

      // Execute
      const result = await productService.createProduct(newProduct);

      // Assert
      expect(mockDb.insert).toHaveBeenCalledWith(newProduct);
      expect(mockDb.insert).toHaveBeenCalledTimes(1);
      expect(result).toEqual(insertedProduct);
    });

    test('should handle db.insert failure', async () => {
      // Setup
      const newProduct = { name: 'Invalid' };
      const error = new Error('Database error');
      mockDb.insert.mockRejectedValue(error);

      // Execute & Assert
      await expect(productService.createProduct(newProduct)).rejects.toThrow('Database error');
      expect(mockDb.insert).toHaveBeenCalledWith(newProduct);
    });

  });
});
