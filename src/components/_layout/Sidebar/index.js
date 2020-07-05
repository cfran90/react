import React, {Component} from "react";
import {Link} from "react-router-dom";

import logo from '../../../assets/images/logo.svg';

import {IconLi} from './style';

export default class SidebarComponent extends Component {
    render() {
        // const {name, email} = this.props.user;
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <div
                    className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                    <a className="sidebar-brand brand-logo" href="index.html"><img src={logo}
                                                                                   alt="logo"/></a>
                    <a className="sidebar-brand brand-logo-mini" href="index.html"><img
                        src="assets/images/logo-mini.svg" alt="logo"/></a>
                </div>
                <ul className="nav">
                    <li className="nav-item nav-category">
                        <span className="nav-link">Navigation</span>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="index.html">
                            <span className="menu-icon">
                              <i className="mdi mdi-speedometer"></i>
                            </span>
                            <span className="menu-title">Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false"
                           aria-controls="ui-basic">
                            <span className="menu-icon">
                              <i className="mdi mdi-laptop"></i>
                            </span>
                            <span className="menu-title">Basic UI Elements</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="ui-basic">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"><a className="nav-link"
                                                            href="pages/ui-features/buttons.html">Buttons</a></li>
                                <li className="nav-item"><a className="nav-link"
                                                            href="pages/ui-features/dropdowns.html">Dropdowns</a></li>
                                <li className="nav-item"><a className="nav-link"
                                                            href="pages/ui-features/typography.html">Typography</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="pages/forms/basic_elements.html">
                            <span className="menu-icon">
                              <i className="mdi mdi-playlist-play"></i>
                            </span>
                            <span className="menu-title">Form Elements</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="pages/tables/basic-table.html">
                            <span className="menu-icon">
                              <i className="mdi mdi-table-large"></i>
                            </span>
                            <span className="menu-title">Tables</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="pages/charts/chartjs.html">
                            <span className="menu-icon">
                              <i className="mdi mdi-chart-bar"></i>
                            </span>
                            <span className="menu-title">Charts</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="pages/icons/mdi.html">
                            <span className="menu-icon">
                              <i className="mdi mdi-contacts"></i>
                            </span>
                            <span className="menu-title">Icons</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false"
                           aria-controls="auth">
                            <span className="menu-icon">
                              <i className="mdi mdi-security"></i>
                            </span>
                            <span className="menu-title">Administrar</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="auth">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <Link to={'/groups/form'} className="nav-link">
                                        <IconLi>
                                            <i className="mdi mdi-account-circle"></i>
                                        </IconLi>
                                        <span className="menu-title">Grupos</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/users/list'} className="nav-link">
                                        <IconLi>
                                            <i className="mdi mdi-account-circle"></i>
                                        </IconLi>
                                        <span className="menu-title">Usuários</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/permission/form'} className="nav-link">
                                        <IconLi>
                                            <i className="mdi mdi-account-circle"></i>
                                        </IconLi>
                                        <span className="menu-title">Permissões</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    }
}