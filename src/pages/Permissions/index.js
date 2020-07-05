import React, {Component} from "react";
import PermissionService from "../../services/PermissionService"
import {Link, Redirect} from "react-router-dom";
import UserService from "../../services/UserService";
import {toast} from "react-toastify";

export default class Permission extends Component {

    state = {
        name: '',
        description: '',
        type: '',
        redirect: false
    }

    componentDidMount() {
    }

    handleSave = e => {
        e.preventDefault();

        let permToSave = {
            name: this.state.name,
            description: this.state.description,
            type: this.state.type
        }
        console.log(JSON.stringify(permToSave));
        PermissionService.create(permToSave, () => {
            toast.success("Permissão cadastrada com sucesso!");
            this.setState({redirect: true});
        });
    }

    handleChange = event => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };

    render() {
        const {name, description, type, redirect} = this.state;
        if (redirect) {
            return <Redirect to='/'/>;
        }
        return (
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Nova permissão</h4>
                            <form className="forms-sample" autoComplete="off" onSubmit={this.handleSave}>
                                <div className="form-group">
                                    <label htmlFor="name">Nome:</label>
                                    <input type="text" name="name" placeholder="Nome" className="form-control"
                                           value={name} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Descrição:</label>
                                    <input type="text" name="description" placeholder="Descrição"
                                           className="form-control"
                                           value={description} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Tipo:</label>
                                    <input type="text" name="type" placeholder="Tipo" className="form-control"
                                           value={type} onChange={this.handleChange}/>
                                </div>
                                <div className="link-group">
                                    <button type="submit" className="btn btn-success">Salvar</button>
                                    <Link to={'/'} className="btn btn-outline-warning">Voltar</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}