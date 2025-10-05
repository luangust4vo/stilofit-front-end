import BaseService from "./BaseService";

class ContractService extends BaseService{
    constructor(){
        super('/contracts')
    }

    async findAll(){
        const response = await this.api.get(`${this.endPoint}`); // `${this.endPoint}/list-all-contracts` não existe no back
        return response.data.content;
    }
}

export default ContractService;