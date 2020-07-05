import React from 'react';

import Routes from './route/routes';
import GlobalStyle from './styles/global';

import 'jquery/dist/jquery.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './assets/css/adminTemplateStyle.css';
import './assets/vendors/mdi/css/materialdesignicons.min.css';

import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes/>
            <GlobalStyle/>
            <ToastContainer autoClose={3000}/>
        </BrowserRouter>
    );
}

export default App;