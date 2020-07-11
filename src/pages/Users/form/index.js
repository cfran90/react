import React, {Component} from "react";

import {toast} from "react-toastify";
import {Link, Redirect} from "react-router-dom";
import Select from 'react-select';

import UserService from "../../../services/UserService";
import GroupService from "../../../services/GroupService";

export default class FormUser extends Component {

    state = {

        groupsSelectLoading: false,
        groupsSelectableValues: [],
        groupsSelectCurrentValue: null,

        redirect: false,
        userName: '',
        email: '',
        password: '',
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({
            groupsSelectLoading: true
        })
        if (id) {
            UserService.findById(id).then((user) => {
                this.setState({
                    userName: user.data.name,
                    email: user.data.email,
                    groupsSelectCurrentValue: this.formatValuesSelect(user.data.groups)
                })
            });
        }
        GroupService.findAll().then(groups => {

            this.setState({
                groupsSelectableValues: this.formatValuesSelect(groups.data),
                groupsSelectLoading: false
            })

        });
    }

    formatValuesSelect(groups) {
        return groups.map((g) => {
            return {"label": g.name, "value": g.id}
        });
    }

    handleChange = event => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };

    handleChangeSelect(arr) {
        this.setState({
            groupsSelectCurrentValue: arr
        });
    }

    handleSave = e => {
        e.preventDefault();
        console.log("handle save")
        const {id} = this.props.match.params;
        let userToSave = {
            name: this.state.userName,
            email: this.state.email,
            groups: this.state.groupsSelectCurrentValue.map(g => g.value)
        }
        if (id) {
            UserService.updateUser(id, userToSave, () => {
                toast.success("Usuário atualizado com sucesso");
                this.setState({redirect: true});
            });
        } else {
            userToSave.password = this.state.password;
            UserService.newUser(userToSave, () => {
                toast.success("Usuário cadastrado com sucesso!");
                this.setState({redirect: true});
            });
        }
    };

    render() {
        const {id} = this.props.match.params;
        const {
            groupsSelectLoading,

            groupsSelectableValues,
            userName,
            redirect,
            groupsSelectCurrentValue,
            email, password
        } = this.state;


        if (redirect) {
            return <Redirect to='/users/list'/>;
        }
        return (
            <div className="row justify-content-center">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{id ? 'Editar' : 'Criar'} usuário:</h4>
                            <form className="forms-sample" autoComplete="off" onSubmit={this.handleSave}>
                                <div className="form-group">
                                    <label htmlFor="userName">Nome:</label>
                                    <input type="text" name="userName" placeholder="Nome" className="form-control"
                                           value={userName} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="text" name="email" placeholder="E-mail" className="form-control"
                                           value={email} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="groups">Grupos:</label>
                                    <pre>{JSON.stringify(groupsSelectCurrentValue)}</pre>
                                    <Select options={groupsSelectableValues}
                                            isClearable
                                            isMulti
                                            placeholder="Grupos"
                                            value={groupsSelectCurrentValue}
                                            isLoading={groupsSelectLoading}
                                            onChange={newValue => this.handleChangeSelect(newValue)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Senha:</label>
                                    <input type="password" name="password" placeholder="Senha" className="form-control"
                                           value={password} onChange={this.handleChange}/>
                                </div>

                                <div className="link-group">
                                    <button type="submit" className="btn btn-success">Salvar</button>
                                    <Link to={'/users/list'} className="btn btn-outline-warning">Voltar</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}