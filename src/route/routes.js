import React from 'react';
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from "./privateRoute";

import Main from "../pages/Main";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Groups from "../pages/Groups";
import Permissions from "../pages/Permissions";
import FormUser from "../pages/Users/form";
import ListUsers from '../pages/Users/list';
import TestComponent from '../components/Datatable';

export default function Routes() {
    return (
        <Switch>
            <Route path="/login" exact component={Login}/>
            <PrivateRoute path="/" exact component={Main}/>
            <PrivateRoute path="/logout" exact component={Logout}/>
            <PrivateRoute exact path="/permission/form" component={Permissions}/>
            <PrivateRoute exact path="/groups/form" component={Groups}/>
            <PrivateRoute path="/users/list" component={ListUsers}/>
            <PrivateRoute exact path="/users/form" component={FormUser}/>
            <PrivateRoute path="/users/form/:id" component={FormUser}/>
            <PrivateRoute path="/test" component={TestComponent}/>
        </Switch>
    );
}