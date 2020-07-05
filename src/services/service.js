import axios from 'axios';
import {toast} from "react-toastify";

class Service {

    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:3003'
        });
        service.interceptors.request.use(async (config) => {
            const token = localStorage.getItem('rasecToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        this.service = service;
    }

    get(url) {
        return this.service.get(url);
    }

    post(url, payload, callback) {
        return this.service.post(url, payload)
            .then(callback).catch(err => {
                // handleError(err);
                const {error} = err.response.data;
                toast.error(error);
            });
    }

    put(url, payload, callback) {
        return this.service.put(url, payload)
            .then(callback)
            .catch(err => {
                // handleError(err);
                const {error} = err.response.data;
                toast.error(error);
            });
    }

    delete(url, callback) {
        return this.service.delete(url)
            .then(callback).catch(err => {
                // handleError(err);
                const {error} = err.response.data;
                toast.error(error);
            });
    }

    handleError = (error) => {
        switch (error.response.status) {
            case 401:
                this.redirectTo(document, '/')
                break;
            case 404:
                this.redirectTo(document, '/404')
                break;
            default:
                this.redirectTo(document, '/500')
                break;
        }
        return Promise.reject(error)
    }

}

export default Service;