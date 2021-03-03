import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Switch} from 'react-router-dom'

import Home from "./pages/Home"
import ModuleView from "./pages/ModuleView"
import NewModuleView from "./pages/NewModuleView"
import History from "./pages/History"

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/new" component={NewModuleView} />
                <Route exact path="/module/:id" component={ModuleView} />
                <Route exact path="/history" component={History} />
            </Switch>
        </HashRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
