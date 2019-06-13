import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import './globalPath.js';
import axios from 'axios';

class Home extends Component {
    state = {
        isLoading: true,
        cities: [],
        name:''
    };

    async componentDidMount() {
        //const response = await fetch(global.path + '/city-api/cities');
        //const response = await fetch(global.path + '/animals-api/cities');
        //const body = await response.json();
        //axios.get(global.path + '/animals-api/cities').then(res => {
        axios.get(global.path + '/city-service/city-api/cities').then(res => {
            const cities = res.data;
            this.setState({cities, isLoading: false});
        })
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
                    {Object.keys(cities).map(city =>
                            <div key={cities[city].id}>
                                <Button color="link"><Link to={"/city/" + cities[city].id}>{cities[city].name}</Link></Button>
                            </div>
                            )}
                </Container>

            </div>
        );
    }
}

export default Home;