import React, {Component} from "react"

import {ModuleCard} from "../modules/ModuleCard"
import Header from "../Header"
import ModuleService from "../services/ModuleService"
import ModuleViewItem from "../modules/ModuleViewItem"

export default class ModuleView extends Component {

    /**
     * Construit la page permet de voir un module en particulier
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            module: ""
        }

        this.service = new ModuleService()
    }


    /**
     * Recupère le module qui a l'id passé en paramètre
     */
    componentDidMount() {
        this.service.getModule(this.props.match.params.id).then(res => {
            this.setState({
                module: res.module
            })
        })
    }


    /**
     * Retourne le contenu de la vue avec les informations du module
     * @returns {*}
     */
    showModule() {
        return (
            <>
                <Header title={"Module " + this.state.module.name} />
                <div className={"container container-fluid"}>
                    <ModuleCard module={this.state.module}>
                        <table className="table table-striped mb-0">
                            <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Valeur actuelle</th>
                            </tr>
                            </thead>
                            <tbody>
                                { this.state.module.show_temperature === 1 ? <ModuleViewItem title="Temperature" data={this.state.module.temperature} /> : null }
                                { this.state.module.show_used_time === 1 ? <ModuleViewItem title="Temps d'utilisation" data={this.state.module.used_time} /> : null }
                                { this.state.module.show_datas_send === 1 ? <ModuleViewItem title="Données envoyées" data={this.state.module.datas_send} /> : null }

                                {
                                    this.state.module.show_temperature === 0 &&
                                    this.state.module.show_used_time === 0 &&
                                    this.state.module.show_datas_send === 0 ? <ModuleViewItem title="Aucune donnée à afficher" /> : null }
                            </tbody>
                        </table>
                    </ModuleCard>
                </div>
            </>
        )
    }


    /**
     * Retourne une carte avec un message indiquant que le module avec l'id passé en paramètres n'a pas été trouvé
     * @returns {*}
     */
    undefinedModule() {
        return (
            <>
                <Header title="Module inconnu" />
                <div className={"container container-fluid"}>
                    <div className={"card"}>
                        <div className="card-body">
                            Ce module n'existe pas.
                        </div>
                    </div>
                </div>
            </>
        )
    }

    render() {
        const module = this.state.module === "unknown" ? this.undefinedModule() : this.showModule();
        return (
            <>
                { module }
            </>
        )
    }

}
