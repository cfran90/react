import React, {Component} from 'react';

import axios from 'axios';

import {Redirect} from "react-router-dom";
import './style.css';

const URL = 'http://localhost:3003/sessions';

export default class Login extends Component {

    state = {
        redirect: false,
        login: '',
        password: ''
    }

    onChangeLogin = e => {
        this.setState({
            login: e.target.value
        });
    }

    onChangePassord = e => {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin = e => {
        e.preventDefault();
        const userLogin = {
            email: this.state.login,
            password: this.state.password
        }
        console.log(userLogin);
        axios.post(`${URL}`, userLogin).then((user) => {
            console.log(user);
            const {token} = user.data;
            localStorage.setItem('rasecToken', token);
            this.setState({redirect: true});
        });
    }

    render() {
        const {login, password, redirect} = this.state;
        if (redirect) {
            return <Redirect to='/'/>;
        }
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="row w-100 m-0">
                        <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
                            <div className="card col-lg-4 mx-auto">
                                <div className="card-body px-5 py-5">
                                    <h3 className="card-title text-left mb-3">Login</h3>
                                    <form>
                                        <div className="form-group">
                                            <label>Username or email *</label>
                                            <input type="text" className="form-control p_input"
                                                   value={login} onChange={this.onChangeLogin} />
                                        </div>
                                        <div className="form-group">
                                            <label>Password *</label>
                                            <input type="password" className="form-control p_input"
                                                   value={password} onChange={this.onChangePassord} />
                                        </div>
                                        <div className="form-group d-flex align-items-center justify-content-between">
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="checkbox" className="form-check-input"/> Remember me
                                                </label>
                                            </div>
                                            <a href="/forgot/password" className="forgot-pass">Forgot password</a>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary btn-block enter-btn"
                                                    onClick={this.handleLogin}>Login
                                            </button>
                                        </div>
                                        <div className="d-flex">
                                            <button className="btn btn-facebook mr-2 col">
                                                <i className="mdi mdi-facebook"></i> Facebook
                                            </button>
                                            <button className="btn btn-google col">
                                                <i className="mdi mdi-google-plus"></i> Google plus
                                            </button>
                                        </div>
                                        <p className="sign-up">Don't have an Account?<a href="/cadastro"> Sign Up</a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            // <>
            //     <div className="sidenav">
            //         <div className="login-main-text">
            //             <h2>Application<br/> Login Page</h2>
            //             <p>Login or register from here to access.</p>
            //         </div>
            //     </div>
            //     <div className="main">
            //         <div className="col-md-6 col-sm-12">
            //             <div className="login-form">
            //                 <form>
            //                     <div className="form-group">
            //                         <label>User Name</label>
            //                         <input value={login} onChange={this.onChangeLogin} type="text"
            //                                className="form-control" placeholder="User Name"/>
            //                     </div>
            //                     <div className="form-group">
            //                         <label>Password</label>
            //                         <input value={password} onChange={this.onChangePassord} type="password"
            //                                className="form-control" placeholder="Password"/>
            //                     </div>
            //                     <button onClick={this.handleLogin} type="submit" className="btn btn-black">Login
            //                     </button>
            //                 </form>
            //             </div>
            //         </div>
            //     </div>
            // </>
        );
    };
}