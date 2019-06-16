import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, withRouter} from 'react-router-dom';
import './globalPath.js';

class AnimalsList extends Component {
    emptyAnimal = {
        animalname: '',
        typesanimal: '',
        dateborn: '',
        sex: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            animals: this.emptyAnimal
        };
        this.remove = this.remove.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const customer = await (await fetch(global.path +`/animals-api/customer/${this.props.match.params.id}`)).json();
            this.setState({animals: customer});
        }
    }

    async remove(id) {
        const customerId= this.props.match.params.id;
        await fetch(global.path + `/animals-api/customer/${customerId}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedAnimals = [...this.state.animals].filter(i => i.id !== id);
            this.setState({animals: updatedAnimals});
        });
    }

    render() {
        const {animals, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        const customerId = this.props.match.params.id;
        const animalsList = Object.keys(animals).map(animal => {
            return <tr key={animals[animal].id}>
                <td style={{whiteSpace: 'nowrap'}}> <p key={animals[animal].id}>
                    {animals[animal].animalname}</p>
                </td>
                <td><div key={animals[animal].id}>
                    {'вид животного: ' + animals[animal].typesanimal + ', '}<br/>
                    {'дата рождения: ' + animals[animal].dateborn + ', '}<br/>
                    {'пол: ' + animals[animal].sex}</div>
                </td>

                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/animal/" + customerId + '/' + animals[animal].id}>Изменить</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(animals[animal].id)}>Удалить</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

            return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to={"/animal/new/" + customerId}>Добавить животное</Button>
                    </div>
                    <h3>Мои животные:</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Кличка</th>
                            <th width="20%">Характеристики</th>
                            <th width="10%">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {animalsList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default withRouter(AnimalsList);