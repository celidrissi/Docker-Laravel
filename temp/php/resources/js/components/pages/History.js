import React, {Component} from "react"
import Header from "../Header"
import HistoryCard from "../history/HistoryCard"
import HistoryService from "../services/HistoryService"

export default class History extends Component {

    /**
     * Construit la page /history qui affiche l'historique des disfonctionnemnts
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            entries: []
        }

        this.service = new HistoryService()
    }


    /**
     * Obtient la liste des entrées depuis la base de données
     */
    componentDidMount() {
        this.service.getHistory().then(res => {
            this.setState({
                entries: res.history
            })
        })
    }


    /**
     * Marque une entrée de l'historique comme lu pour qu'elle ne soit plus comptabilisé dans le compte des problèmes
     * @param id
     */
    markAsRead(id) {
        this.service.markAsRead(id).then(res => {
            this.setState({
                entries: res.history
            })
        })
    }


    /**
     * Retourne la liste des cartes qui affichent les entrées
     * @returns {*}
     */
    renderHistoryCards() {
        return this.state.entries.map(entry => <HistoryCard key={entry.id} entry={entry} markAsRead={this.markAsRead.bind(this, entry.id)} />)
    }


    /**
     * Retourne une carte vide si aucune entrée n'est trouvée dans la base de données
     * @returns {*}
     */
    emptyCard() {
        return (
            <div className="card">
                <div className="card-body">
                    Tous vos modules fonctionnement correctement.
                </div>
            </div>
        )
    }

    render() {
        return (
            <>
                <Header title="Historiques des problèmes" />
                <div className="container container-fluid">
                    <div className="d-flex flex-wrap justify-content-center">
                        { this.state.entries.length > 1 ? this.renderHistoryCards() : this.emptyCard() }
                    </div>
                </div>
            </>
        )
    }

}
