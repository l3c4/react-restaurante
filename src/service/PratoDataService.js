import axios from 'axios'

const PRATO_API_URL = 'http://localhost:8080/prato'

class PratoDataService {

    retrieveAllPratos() {
        return axios.get(`${PRATO_API_URL}/pratos`);
    }

    deletePrato(pratoId) {
        return axios.delete(`${PRATO_API_URL}/prato/${pratoId}`);
    }

    retrievePrato(pratoId) {
        return axios.get(`${PRATO_API_URL}/prato/${pratoId}`);
    }

    updatePrato(pratoId, prato) {
        return axios.put(`${PRATO_API_URL}/prato/`, prato);
    }

    createPrato(prato) {
        return axios.post(`${PRATO_API_URL}/prato/`, prato);
    }
}

export default new PratoDataService()
