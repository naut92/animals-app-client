import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CountyList from "./CountyList";
import CustomerList from "./CustomerList";
import AnimalsList from "./AnimalsList";
import AnimalEdit from "./AnimalEdit";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/city/:id' component={CountyList}/>;
                    <Route path='/county/:id' component={CustomerList}/>;
                    <Route path='/customer/:id' component={AnimalsList}/>;
                    <Route path='/animal/:id' component={AnimalEdit}/>;
                </Switch>
            </Router>
        )
    }
}

export default App;