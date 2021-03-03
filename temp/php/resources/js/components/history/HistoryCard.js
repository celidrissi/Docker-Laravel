import React, {Component} from "react"

export default class HistoryCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const color = this.props.entry.status === 0 ? 'warning' : 'danger'
        const isRead = this.props.entry.read === 0 ? <button className={"btn btn-" + color} onClick={this.props.markAsRead}>Marqué comme lu</button> : ""
        return (
            <div className={"card border-" + color + " w-25 m-3"}>
                <div className="card-body">
                    <p>Un problème a été détecté sur le module <b>{this.props.entry.module.name}</b> à {this.props.entry.created_at}</p>
                    { isRead }
                </div>
            </div>
        )
    }

}
