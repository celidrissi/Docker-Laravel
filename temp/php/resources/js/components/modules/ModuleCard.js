import React, {Component} from "react"
import {Link} from "react-router-dom"
import ModuleStatus from "./ModuleStatus"

/**
 * Rend une carte avec le détail des informations du module courrant
 */
export class ModuleCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h4>{this.props.module.name}</h4>
                </div>
                <div className="card-body">
                    { this.props.module.show_status ? <ModuleStatus status={this.props.module.status} /> : null }
                    <p className="card-text">{this.props.module.description}</p>
                    { this.props.children == null ? <Link to={"/module/" + this.props.module.id} className={"btn btn-primary"}>Plus de détails</Link> : ""}
                </div>

                { this.props.children }
            </div>
        )
    }

}
