import BaseService from "./BaseService";

class ClientService extends BaseService{
    constructor(){
        super('/clients')
    }
}

export default ClientService;