import {Component} from "react";

export default class Logout extends Component {

    componentWillMount() {
        localStorage.removeItem('rasecToken');
        this.props.history.push('/login');
    }

    render() {
        return null;
    }
}