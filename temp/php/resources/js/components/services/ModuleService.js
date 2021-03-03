import axios from "axios"
import Service from "./Service"

export default class ModuleService extends Service {

    constructor(baseURL = 'http://localhost:8000/api') {
        super(baseURL)
    }


    /**
     * Retourne la liste des modules
     * @returns {Promise<T>}
     */
    async getAllModules() {
        const response = await axios.get(this.baseURL + '/modules')
        return response.data
    }


    /**
     * Retourne un module en particulier
     * @param id
     * @returns {Promise<T>}
     */
    async getModule(id) {
        const response = await axios.get(this.baseURL + '/module/' + id)
        return response.data
    }


    /**
     * Retourne tous les types de modules
     * @returns {Promise<T>}
     */
    async getModuleTypes() {
        const response = await axios.get(this.baseURL + '/module/new')
        return response.data
    }

}
