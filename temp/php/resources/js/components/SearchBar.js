import React, {Component} from "react"

export default class SearchBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="form-inline mb-3" onSubmit={(e) => e.preventDefault()}>
                <input className="form-control mr-2"
                       id="searchbar"
                       type="search"
                       placeholder="Filtrer les modules"
                       aria-label="Filtrer les modules"
                       name="search"
                       onChange={this.props.filter} />
                <button className="btn btn-outline-secondary" type="submit" onClick={this.props.reset}>Réinitialiser</button>
            </form>
        )
    }

}
