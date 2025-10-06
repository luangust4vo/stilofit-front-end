import BaseService from "./BaseService";

class SaleService extends BaseService{
    constructor(){
        super('/sales')
    }

    async findAll(){
        const response = await this.api.get(`${this.endPoint}/list-all-sales`);
        return response.data.content;
    }

    async findPaginated(page, size = 30) {
        const params = { page, size };
        const response = await this.api.get(`${this.endPoint}/list-all-sales`, { params });
        return response.data; 
    }
}

export default SaleService;