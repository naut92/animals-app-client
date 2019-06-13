import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter} from 'react-router-dom';
import './globalPath.js';

class AnimalEdit extends Component {
    emptyAnimal = {
        animalname: '',
        typesanimal: '',
        sex: '',
        dateborn: '',
        customersId: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            animal: this.emptyAnimal,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const animalId = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1, this.props.location.pathname.length);
            const animal = await (await fetch( global.path + `/animals-app/animals-api/animal/:id/${animalId}`)).json();
            this.setState({animal: animal});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let animal = {...this.state.animal};
        animal[name] = value;
        this.setState({animal});
    }

    async handleSubmit(event) {
        console.log(event);
        event.preventDefault();
        const {animal} = this.state;
        const customerId = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1, this.props.location.pathname.length);

        await fetch((animal.id) ? global.path + '/animals-app/animals-api/animal/'+ animal.customersId + '/' +  animal.id : global.path + '/animals-app/animals-api/animal/new/' + customerId,{
                method: (animal.id) ? 'PUT' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(animal),
            });
        (animal.id) ? this.props.history.push('/customer/' + animal.customersId) : this.props.history.push('/customer/' + customerId);
    }

    render() {
        const {animal} = this.state;
        const title = <h2>{animal.id ? 'Внести изменения' : 'Добавить животное'}</h2>;
            return <div>
                <AppNavbar/>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="animalname">Кличка</Label>
                            <Input type="text" name="animalname" id="animalname" value={animal.animalname || ''}
                                   onChange={this.handleChange} autoComplete="animalname"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="dateborn">Дата рождения</Label>
                            <Input type="text" name="dateborn" id="dateborn" value={animal.dateborn || ''}
                                   onChange={this.handleChange} autoComplete="dateborn"/>
                        </FormGroup>
                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="typesanimal">Вид животного</Label>
                                <select className="custom-select" name="typesanimal" id="typesanimal" onChange={this.handleChange}>
                                    <option selected type="text" autoComplete="typesanimal">{animal.typesanimal || ''}</option>
                                    <option value="cat">cat</option>
                                    <option value="dog">dog</option>
                                    <option value="bird">bird</option>
                                    <option value="fish">fish</option>
                                </select>
                            </FormGroup>
                            <FormGroup className="col-md-5 mb-3">
                                <Label for="sex">Пол животного</Label>
                                <select className="custom-select" name="sex" id="sex" onChange={this.handleChange} >
                                    <option selected type="text" autoComplete="sex">{animal.sex || ''}</option>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </select>
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <Button color="primary" type="submit">Сохранить</Button>{' '}
                            <Button color="secondary" tag={Link} to={(this.props.match.params.id !== 'new') ? "/customer/" + this.props.match.params.id : "/customer/"
                                + this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1, this.props.location.pathname.length)}>Отмена</Button>{' '}
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        }
}
export default withRouter(AnimalEdit);