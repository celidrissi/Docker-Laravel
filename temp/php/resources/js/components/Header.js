import React, {Component} from "react"
import {Link} from "react-router-dom"
import HistoryService from "./services/HistoryService"

export default class Header extends Component {

    /**
     * Construit la navigation et le titre principal
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            count: 0,
            showAlert: false
        }

        this.service = new HistoryService()
    }

    /**
     * Compte le nombre de problèmes qui n'ont pas étés indiqués comme lus
     */
    componentDidMount() {
        this.service.getHistory().then(res => {
            this.setState({
                count: res.history.filter(item => item.read === 0).length
            })
        })
    }


    /**
     * Envoie une requête pour simuler un disfonctionnement des modules
     */
    simulate() {
        this.service.simulate().then(res => {
            this.setState({
                count: this.state.count + 1,
                showAlert: true
            })
        })
    }


    /**
     * Affiche une alerte quand on clique sur le bouton (simulation de disfonctionnement)
     * @returns {*}
     */
    showAlert() {
        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                Un module semble défécteux, veuillez vérifier votre matériel.
            </div>
        )
    }

    render() {
        const alert = this.state.showAlert ? this.showAlert() : "";
        return (
            <>
                { alert }
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container container-fluid">
                        <a className="navbar-brand" href="#">Gestion de modules IOT</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Accueil <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/new" className="nav-link">Ajouter un module</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/history" className="nav-link">Historique <span className="badge badge-danger">{ this.state.count }</span> </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">
                            { this.props.title }
                            <form onSubmit={(e) => e.preventDefault()}>
                                <button className="btn btn-danger" onClick={this.simulate.bind(this)}>Simuler un disfonctionnement</button>
                            </form>
                        </h1>
                    </div>
                </div>
            </>
        )
    }

}
