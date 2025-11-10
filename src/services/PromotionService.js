import BaseService from "./BaseService";

class PromotionService extends BaseService{
    constructor(){
        super('/promotions')
    }

    async findAll(){
        const response = await this.api.get(`${this.endPoint}/list-all`);
        return response.data.content;
    }
}

export default PromotionService;