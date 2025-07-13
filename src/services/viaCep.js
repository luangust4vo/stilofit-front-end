import axios from "axios";

export const fetchAddressByCEP = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.erro) return null;
        return response;
    } catch (error) {
        return null;
    }
};