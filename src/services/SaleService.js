import BaseService from "./BaseService";

class SaleService extends BaseService{
    constructor(){
        super('/sales')
    }

    async findAll(){
        const response = await this.api.get(`${this.endPoint}/list-all-sales`);
        return response.data.content;
    }
}

export default SaleService;