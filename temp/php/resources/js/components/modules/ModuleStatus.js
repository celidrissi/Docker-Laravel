import React, {Component} from "react"

/**
 * Crée un badge avec un style différent en fonction du status
 */
export default class ModuleStatus extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let message = null
        let color = null
        if(this.props.status === "SUCCESS") {
            message = "Fonctionne correctement"
            color = "success"
        } else if(this.props.status === "WARNING") {
            message = "Fonctionne anormalement"
            color = "warning"
        } else {
            message = "Ne fonctionne pas"
            color = "danger"
        }

        return (
            <span className={"float-right badge badge-" + color}>
                { message }
            </span>
        )
    }

}
