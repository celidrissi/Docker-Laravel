import axios from "axios"
import Service from "./Service"

export default class HistoryService extends Service {

    constructor(baseURL = 'http://localhost:8000/api') {
        super(baseURL)
    }


    /**
     * Retourne l'historique des disfonctionnements
     * @returns {Promise<T>}
     */
    async getHistory() {
        const response = await axios.get(this.baseURL + '/history')
        return response.data
    }


    /**
     * Permet de simuler le disfonctionnement de modules
     */
    async simulate() {
        const response = await axios.get(this.baseURL + '/history/simulate')
        return response.data
    }


    /**
     * Modifie l'entrée d'historique pour l'assignées comme étant <lue> pour qu'elle ne soit plus comptabilisé dans le compte
     * des problèmes actifs
     * @param id
     * @returns {Promise<T>}
     */
    async markAsRead(id) {
        const response = await axios.get(this.baseURL + '/history/mark/' + id)
        return response.data
    }

}
