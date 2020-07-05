import React from "react";
import {Route, Redirect} from 'react-router-dom';

import Backbone from "../components/_layout/Backbone";

const isAuth = () => {
    if (localStorage.getItem('rasecToken') !== null) {
        return true;
    } else {
        return false;
    }
}

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        isAuth()
            ? (
                <Backbone>
                    <Component {...props} />
                </Backbone>
            )
            : (<Redirect to={{pathname: '/login', state: {from: props.location}}}/>)
    )}
    />
)
export default PrivateRoute;