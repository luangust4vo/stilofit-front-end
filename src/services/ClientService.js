import BaseService from "./BaseService";

class ClientService extends BaseService{
    constructor(){
        super('/clients')
    }

    async findAll(){
        const response = await this.api.get(`${this.endPoint}/list-all-clients`);
        return response.data.content;
    }
}

export default ClientService;