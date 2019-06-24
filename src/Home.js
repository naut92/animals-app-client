import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import './globalPath.js';

class Home extends Component {
    state = {
        isLoading: true,
        cities: []
    };

    async componentDidMount() {
        const response = await fetch(global.path + '/city-service/cities');
        //const response = await fetch(global.path + '/cities');
        const body = await response.json();
        this.setState({ cities: body, isLoading: false });
    }

    render() {
        const {cities, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {/*<Button color="link"><Link to="/customers">Manage animals</Link></Button>*/}
                    <h2>Cities:</h2>
                    {cities.map(city =>
                            <div key={city.id}>
                                <Button color="link"><Link to={"/city/" + city.id}>{city.name}</Link></Button>
                            </div>
                            )}
                </Container>

            </div>
        );
    }
}

export default Home;