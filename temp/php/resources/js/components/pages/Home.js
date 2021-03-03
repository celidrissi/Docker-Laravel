import React, {Component} from "react"
import {Link} from "react-router-dom"

import Header from "../Header"
import {ModuleCard} from "../modules/ModuleCard"
import ModuleService from "../services/ModuleService"
import SearchBar from "../SearchBar"

export default class Home extends Component {

    /**
     * Construit la page /new pour un ajouter un nouveau module
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            modules: [],
            error: "",
            searchTerm: '',
        }

        this.service = new ModuleService()
    }


    /**
     * Obtient la liste des modules depuis la base de données
     */
    componentDidMount() {
        this.fetchModules()
    }


    /**
     * Modifie le state avec les données des modules reçus depuis la base de données
     */
    fetchModules() {
        this.service.getAllModules().then(res => {
            this.setState({
                modules: res.modules
            })
        })
    }


    /**
     * Filtre les modules
     */
    filter(event) {
        this.setState({
            modules: (event.target.value !== "") ? this.state.modules.filter(mod => {
                return mod.name.includes(event.target.value) || mod.description.includes(event.target.value)
            }) : ""
        })
    }


    /**
     * Réinitialise les données
     */
    resetForm() {
        document.getElementById('searchbar').value = ''
        this.fetchModules()
    }


    /**
     * Génère la liste des cartes avec les informations du module
     * @returns {*[]}
     */
    renderModule() {
        return this.state.modules.map(module => <ModuleCard key={module.id} module={module} />)
    }


    /**
     * Retourne une carte vide pour indiquer qu'il n'y a pas de contenu
     * @returns {*}
     */
    emptyModule() {
        return (
            <div className="card">
                <div className="card-body">
                    <p>Aucun module trouvé..</p>
                    <p className="mb-0">
                        <Link to='/new'>Vous pouvez en ajouter un en cliquant ici.</Link>
                    </p>
                </div>
            </div>
        )
    }

    render() {
        const content = this.state.modules.length > 0 ? this.renderModule() : this.emptyModule()
        return (
           <>
               <Header title="Liste des modules" />
               <div className="container container-fluid">
                    <SearchBar filter={this.filter.bind(this)} reset={this.resetForm.bind(this)} />

                   { content }
               </div>
           </>
        )
    }

}
