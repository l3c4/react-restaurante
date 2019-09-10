import axios from 'axios'

const RESTAURANTE_API_URL = 'http://localhost:8080/restaurante'

class RestauranteDataService {

    retrieveAllRestaurantes() {
        return axios.get(`${RESTAURANTE_API_URL}/restaurantes`);
    }

    retrieveAllRestaurantesByRestauranteNome(restauranteNome) {
        return axios.get(`${RESTAURANTE_API_URL}/pesquisarPorRestauranteNome?restauranteNome=${restauranteNome}`);
    }

    deleteRestaurante(restauranteId) {
        return axios.delete(`${RESTAURANTE_API_URL}/restaurante/${restauranteId}`);
    }

    retrieveRestaurante(restauranteId) {
        return axios.get(`${RESTAURANTE_API_URL}/restaurante/${restauranteId}`);
    }

    updateRestaurante(restauranteId, restaurante) {
        return axios.put(`${RESTAURANTE_API_URL}/restaurante`, restaurante);
    }

    createRestaurante(restaurante) {
        return axios.post(`${RESTAURANTE_API_URL}/restaurante`, restaurante);
    }
}

export default new RestauranteDataService()
