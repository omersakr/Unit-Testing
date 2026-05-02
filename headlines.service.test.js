const { HeadlinesService } = require('./headlines.service');

describe('HeadlinesService', () => {
  let mockDb;
  let mockApi;
  let headlinesService;

  beforeEach(() => {
    mockDb = {
      get: jest.fn(),
      set: jest.fn()
    };

    mockApi = {
      fetch: jest.fn()
    };

    headlinesService = new HeadlinesService(mockDb, mockApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Case 1: Cache exists', () => {
    
    test('should return cached data and not call API', async () => {
      const cachedData = ['Headline 1', 'Headline 2'];
      mockDb.get.mockResolvedValue(cachedData);

      // Execute
      const result = await headlinesService.getHeadlines();

      // Assert
      expect(mockDb.get).toHaveBeenCalledWith('headlines');
      expect(mockDb.get).toHaveBeenCalledTimes(1);
      expect(mockApi.fetch).not.toHaveBeenCalled();
      expect(mockDb.set).not.toHaveBeenCalled();
      expect(result).toEqual(cachedData);
    });

  });

  describe('Case 2: Cache missing', () => {
    
    test('should fetch from API and cache the result', async () => {
      const apiData = ['Fresh Headline 1', 'Fresh Headline 2'];
      mockDb.get.mockResolvedValue(null);
      mockApi.fetch.mockResolvedValue(apiData);
      mockDb.set.mockResolvedValue(undefined);

      // Execute
      const result = await headlinesService.getHeadlines();

      // Assert
      expect(mockDb.get).toHaveBeenCalledWith('headlines');
      expect(mockApi.fetch).toHaveBeenCalled();
      expect(mockApi.fetch).toHaveBeenCalledTimes(1);
      expect(mockDb.set).toHaveBeenCalledWith('headlines', apiData);
      expect(mockDb.set).toHaveBeenCalledTimes(1);
      expect(result).toEqual(apiData);
    });

  });

  describe('Case 3: API fails', () => {
    
    test('should throw error and not cache when API fails', async () => {
      const error = new Error('API connection failed');
      mockDb.get.mockResolvedValue(null);
      mockApi.fetch.mockRejectedValue(error);

      await expect(headlinesService.getHeadlines()).rejects.toThrow('API connection failed');
      
      expect(mockDb.get).toHaveBeenCalledWith('headlines');
      expect(mockApi.fetch).toHaveBeenCalled();
      expect(mockDb.set).not.toHaveBeenCalled();
    });

  });
});
