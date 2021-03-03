import React, {Component} from "react"
import Header from "../Header"
import ModuleService from "../services/ModuleService"
import axios from "axios"

export default class NewModuleView extends Component {

    /**
     * Construit la page /new pour un ajouter un nouveau module
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            modules: [],
            errors: {},
            name: "",
            number: "",
            type: "",
            newType: "",
            description: "",
            infos: []
        }

        this.service = new ModuleService()
        this.handleInput = this.handleInput.bind(this)
        this.createModule = this.createModule.bind(this)
    }


    /**
     * Obtient la liste des types de modules depuis la base de données
     */
    componentDidMount() {
        this.service.getModuleTypes().then(res => {
            this.setState({
                modules: res.modules
            })
        })
    }


    /**
     * Met à jour le state quand on tape dans un input
     * @param e
     */
    handleInput(e) {
        if(e.target.name === "infos") {
            this.setState({
                infos: Array.from(e.target.selectedOptions, option => option.value)
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }


    /**
     * Rend la liste des types de modules disponibles pour le select
     * @returns {*[]}
     */
    renderModuleTypes() {
        return this.state.modules.map(type => <option key={type.id} value={type.name}>{type.name}</option>)
    }


    /**
     * Envoie une requête pour créer un module
     */
    createModule() {
        const toSend = {
            name: this.state.name,
            number_identifier: this.state.number,
            type: this.state.type,
            newType: this.state.newType,
            description: this.state.description,
            infos: this.state.infos
        }

        axios.post( 'http://localhost:8000/api/module', toSend).then(() => window.location.href = '/').catch(err => {
            if(err.response.status === 422) {
                this.setState({
                    errors: err.response.data.errors
                })
            }
        })
    }


    /**
     * Affiche les erreurs du forumulaire
     * @returns {*}
     */
    renderErrors() {
        const errorItems = Object.keys(this.state.errors).map( (key, i) => {
            const error = this.state.errors[key][0]
            return (
                <li key={error} className="col list-group-item list-group-item-warning">
                    {error}
                </li>
            )
        })

        return (
            <ul className="list-group list-group-horizontal mb-3 d-flex justify-content-between">
                {errorItems}
            </ul>
        )
    }


    render() {
        const err = this.renderErrors()

        return (
            <>
                <Header title={"Ajouter un module"} />

                <div className={"container container-fluid"}>
                    <div className="card">
                        <div className="card-body">
                            { this.state.errors && this.state.errors.message }
                            { err }

                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-row form-group">
                                    <div className="col">
                                        <label htmlFor="name">Nom</label>
                                        <input type="text"
                                               className="form-control"
                                               id="name"
                                               aria-describedby="Nom du module"
                                               name="name"
                                               onChange={this.handleInput}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="number">Numéro d'identification</label>
                                        <input type="text"
                                               className="form-control"
                                               id="number"
                                               aria-describedby="Numéro d'indentificaton du module"
                                               name="number"
                                               onChange={this.handleInput}
                                        />
                                    </div>
                                </div>
                                <div className="form-row form-group">
                                    <div className="col">
                                        <label htmlFor="type">Type du module</label>
                                        <select className="form-control" id="type" name="type" onChange={this.handleInput}>
                                            <option>Choisir le type</option>
                                            { this.renderModuleTypes() }
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="newType">Ajouter un nouveau type de module</label>
                                        <input type="text"
                                               className="form-control"
                                               id="newType"
                                               aria-describedby="Nom du module"
                                               name="newType"
                                               onChange={this.handleInput}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea type="description"
                                              className="form-control"
                                              id="description"
                                              aria-describedby="Description du module"
                                              name="description"
                                              onChange={this.handleInput}>
                                    </textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="infos">Informations à afficher</label>
                                    <select multiple
                                            className="form-control"
                                            id="infos"
                                            name="infos"
                                            onChange={this.handleInput}>
                                        <option value="temperature">Température</option>
                                        <option value="time">Duréee de fonctionnement</option>
                                        <option value="datas">Nombre de données envoyées</option>
                                        <option value="state">État de marche</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.createModule}>Ajouter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
