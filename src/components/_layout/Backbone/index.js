import React, {Component} from "react";
import SidebarComponent from "../Sidebar";
import NavbarComponent from "../Navbar";

export default class Backbone extends Component {

    render() {
        return (
            <div className="container-scroller">
                <SidebarComponent/>
                <NavbarComponent/>
                <div className="main-panel">
                    <div className="content-wrapper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }

}