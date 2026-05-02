class HeadlinesService {
  constructor(db, api) {
    this.db = db;
    this.api = api;
  }

  async getHeadlines() {
    const cached = await this.db.get('headlines');
    
    if (cached) {
      return cached;
    }

    const data = await this.api.fetch();
    await this.db.set('headlines', data);
    return data;
  }
}

module.exports = {
  HeadlinesService
};
