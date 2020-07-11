import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import PermissionService from "../../services/PermissionService";
import {toast} from "react-toastify";
import GroupService from "../../services/GroupService";

export default class GroupPermissions extends Component {

    state = {

        groupsPermissions: [],
        permissions: [],

        name: '',
        description: '',
        type: '',
        redirect: false,
    }

    componentDidMount() {
        GroupService.findAll().then(groups => {
            this.setState({
                groupsPermissions: groups.data
            })
        })
        PermissionService.findAll().then(permissions => {
            this.setState({
                permissions: permissions.data
            })
        })
    }

    handleSave = e => {
        e.preventDefault();

        // let permToSave = {
        //     name: this.state.name,
        //     description: this.state.description,
        //     type: this.state.type
        // }
        // PermissionService.create(permToSave, () => {
        //     toast.success("Permissão cadastrada com sucesso!");
        //     this.setState({redirect: true});
        // });
    }

    handleChange = event => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };

    saveGroupPermission(event, group, permission) {
        let isChecked = event.target.checked;
        GroupService.saveOrRemovePermission(group.id, permission.id, isChecked, () => {
            toast.success(`Permissão ${permission.name} ${isChecked ? 'adicionada ' : 'removida '} do grupo 
                ${group.name}`);
        });
    }

     groupHasPermission(group, permission) {
        let t = group.permissions.filter( perm => perm.name == permission);
        return t.length
    }

    checkboxByGroup(group, permission) {
        let hasPermission = this.groupHasPermission(group, permission.name);
        return <input type="checkbox" defaultChecked={hasPermission}
                      onChange={(event) => this.saveGroupPermission(event, group, permission)} />;
    }

    render() {
        const {name, description, type, redirect,
            groupsPermissions,
            permissions
        } = this.state;
        console.log(groupsPermissions)
        if (redirect) {
            return <Redirect to='/'/>;
        }

        // const listItems = groupsPermissions.map((groups) =>
        //     <li key={groups.name}>
        //         {groups.name}
        //     </li>
        // );
        return (
            <table className="table">
                <thead>

                    <tr>
                        <th scope="col">#</th>
                        {
                            groupsPermissions.map(groups =>
                                <th scope="col" key={groups.name}>{groups.name}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        permissions.map(permissions =>
                            <tr key={permissions.name}>
                                <td>
                                    {permissions.name}
                                </td>
                                {
                                    groupsPermissions.map(groups =>
                                        <td scope="col" key={groups.name}>{this.checkboxByGroup(groups, permissions)}</td>
                                    )
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }
}