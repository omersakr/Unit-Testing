class ProductService {
  constructor(db) {
    this.db = db;
  }

  async getProduct(id) {
    return this.db.find(id);
  }

  async createProduct(product) {
    return this.db.insert(product);
  }
}

module.exports = {
  ProductService
};
