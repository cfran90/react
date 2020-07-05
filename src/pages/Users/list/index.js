import React, {Component} from "react";

import api from "../../../services/api";

import {Link} from "react-router-dom";

import UserService from "../../../services/UserService";
import Datatable from "../../../components/Datatable";
import moment from "moment";

export default class ListUsers extends Component {

    columns = [
        {
            name: 'Ações',
            cell: () => <button variant="contained" color="primary" onClick={this.handleAction}>Action</button>,
            button: true,
        },
        {
            name: 'Nome',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'E-mail',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Data',
            selector: 'createdAt',
            sortable: true,
            cell: row => this.formatDate(row.createdAt),
        },
        {
            name: 'Grupos',
            selector: 'groups',
            sortable: false,
            right: true,
            cell: row => this.formatGroups(row.groups),
        },
    ];

    state = {
        loading: true,
        list: [],
        selectedRows: []
    };

    componentDidMount = async () => {
        this.setState({
            loading: true
        });
        this.refreshList();
    }

    handleAction = () => {
        console.log("teste action");
    }

    refreshList = async () => {
        const [users] = await Promise.all([
            api.get(`/users?sort=+name`)
        ]);

        console.log(JSON.stringify(users.data))
        this.setState({
            list: users.data,
            loading: false
        });
    }

    handleList = async () => {
        // const temp = {
        //     "name": "Cesar1",
        //     "login": "cesarfrantz2",
        //     "password": "teste1234"
        // };

        const [users] = await Promise.all([
            api.get("/users?sort=+name")
        ]);

        this.setState({
            list: users.data
        });

        console.log(JSON.stringify(this.state.list))
    };

    formatDate(dateToFormat) {
        return moment(dateToFormat).format('L');
    }

    formatGroups(groups) {
        let gs = groups.map(g => g.name);
        return gs.join(", ");
    }

    fnDelete = async () => {
        const user = this.state.selectedRows[0];

        // await Promise.all([
        //     api.delete(`/users/${user.id}`)
        // ]);
        //
        // this.refreshList();

        await UserService.deleteUser(user.id, this.refreshList);
    }

    fnUpdate = () => {
        const user = this.state.selectedRows[0];
        console.log(user)
        this.props.history.push(`/users/form/${user.id}`);
        // return <Redirect to={url}/>;
        // UserService.deleteUser(user.id, this.refreshList);
    }

    handleChange = (statess) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', statess.selectedRows);
        this.setState({
            selectedRows: statess.selectedRows
        });
    };

    render() {
        const {
            list,
            loading
        } = this.state;
        if (loading) {
            return <div>Carregando</div>;
        }
        return (
            <div className="row">
                {/*<div className="col-lg-12">*/}
                {/*    <p>Usuários:</p>*/}
                {/*    <div>*/}
                {/*        <List>*/}
                {/*            {list.map(users => (*/}
                {/*                <li key={users.name}>*/}
                {/*                    <div className="row">*/}
                {/*                        <div className="col-lg-3">*/}
                {/*                            {users.name}*/}
                {/*                        </div>*/}
                {/*                        <div className="col-lg-3">*/}
                {/*                            {users.login}*/}
                {/*                        </div>*/}
                {/*                        <div className="col-lg-3">*/}
                {/*                            {users.createdAt}*/}
                {/*                        </div>*/}
                {/*                        <div className="col-lg-3">*/}
                {/*                            <button type="button" className="btn btn-sm btn-danger"*/}
                {/*                                    onClick={() => this.handleOnClick(users)}>Deletar*/}
                {/*                            </button>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}

                {/*                </li>*/}
                {/*            ))}*/}
                {/*        </List>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="col-lg-12">
                    <Datatable data={list} columns={this.columns} handleChange={this.handleChange} linkForm="/users/form" />
                    <div className="link-group">
                        <Link to={'/users/form'} className="btn btn-warning">
                            <i className="mdi mdi-account-plus"></i> Novo
                        </Link>
                        <button onClick={this.fnUpdate}
                                type="button" className="btn btn-warning">
                            <i className="mdi mdi-account-edit"></i> Editar
                        </button>
                        <button onClick={this.fnDelete}
                                type="button" className="btn btn-warning">
                            <i className="mdi mdi-account-remove"></i> Deletar
                        </button>
                        <Link to={'/'} className="btn btn-outline-warning">
                            <i className="mdi mdi-keyboard-return"></i> Voltar
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}