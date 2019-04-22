import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import './globalPath.js';

class Home extends Component {
    state = {
        isLoading: true,
        customers: []
    };

    async componentDidMount() {
        const response = await fetch(global.path + '/api/customers');
        const body = await response.json();
        this.setState({ customers: body, isLoading: false });
    }

    render() {
        const {customers, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {/*<Button color="link"><Link to="/customers">Manage animals</Link></Button>*/}
                    <h2>Клиенты:</h2>
                    {customers.map(customer =>
                            <div key={customer.id}>
                                <Button color="link"><Link to={"/customer/" + customer.id}>{customer.email}</Link></Button>
                            </div>
                            )}
                </Container>

            </div>
        );
    }
}

export default Home;