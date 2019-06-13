import React, { Component } from 'react';
import {Button, ButtonGroup, Container, Form, FormGroup, Input, Label, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter} from 'react-router-dom';
import './globalPath.js';

class CountyList extends Component {
    emptyCity = {
        isLoading: true,
        city: '',
        name:'',
        countyById: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            city: this.emptyCity
        };
    }

    async componentDidMount() {
        const city = await (await fetch(global.path +`/city-service/city-api/city/${this.props.match.params.id}`)).json();
        this.setState({city: city});
    }

    render() {
        const {city, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h4>{city.name}</h4>
                    <h2>Counties:</h2>
                    {Object.keys(city.countyById).map(county =>
                        <div key={city.countyById[county].id}>
                            <Button color="link"><Link to={"/county/" + city.countyById[county].id}>{city.countyById[county].name}</Link></Button>
                        </div>
                    )}
                </Container>

            </div>
        );
    }
}

export default withRouter(CountyList);