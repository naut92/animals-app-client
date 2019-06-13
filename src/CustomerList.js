import React, { Component } from 'react';
import {Button, ButtonGroup, Container, Form, FormGroup, Input, Label, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter} from 'react-router-dom';
import './globalPath.js';

class CustomerList extends Component {
    emptyCounty = {
        isLoading: true,
        county: '',
        email:'',
        customerById: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            county: this.emptyCounty
        };
    }

    async componentDidMount() {
        const county = await (await fetch(global.path +`/counties-service/counties-api/county/${this.props.match.params.id}`)).json();
        this.setState({county: county});
    }

    render() {
        const {county, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h4>{county.name}</h4>
                    <h2>Customers:</h2>
                    {Object.keys(county.customerById).map(customer =>
                        <div key={county.customerById[customer].id}>
                            <Button color="link"><Link to={ "/customer/" + county.customerById[customer].id}>{county.customerById[customer].email}</Link></Button>
                        </div>
                    )}
                </Container>

            </div>
        );
    }
}

export default withRouter(CustomerList);