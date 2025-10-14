import BaseService from "./BaseService";

class ContractService extends BaseService {
  constructor() {
    super("/contracts");
  }

  async findAll() {
    const response = await this.api.get(`${this.endPoint}`); // `${this.endPoint}/list-all-contracts` não existe no back
    return response.data.content;
  }

  async findPaginated(page, size = 30) {
    const params = { page, size };
    const response = await this.api.get(`${this.endPoint}`, {
      params,
    });
    return response.data;
  }

  async findByName(page, name, size = 30) {
    const params = { page, name, size };
    const response = await this.api.get(`${this.endPoint}`, {
      params,
    });
    return response.data;
  }
}

export default ContractService;
