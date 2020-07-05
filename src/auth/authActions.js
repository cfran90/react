import axios from 'axios';
import consts from "../utils/consts";
import toastr from 'react-redux-toastr';

export function login(values) {
    return submit((values, `${consts.API_URL/login}`));
}

export function singup(values) {
    return submit((values, `${consts.API_URL/singup}`));
}

export function logout(values) {
    return {type: 'TOKEN_VALIDATE', payload: false}
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(res => {
                dispatch([
                    {type: 'USER_FETCHED', payload: res.data}
                ])
            })
            .catch(e => {
                e.response.data.errors.forEach(
                    error => toastr.error('Erro', error)
                )
            })
    }
}

function validadeToken(token) {
    return dispatch => {
        if (token) {
            axios.post(`${consts.API_URL}/sessions`, {token})
                .then(res => {
                    dispatch({type: 'TOKEN_VALIDADE', payload: res.data.valid});
                })
                .catch(e => dispatch({type: 'TOKEN_VALIDADE', payload: false}));
        } else {
            dispatch({type: 'TOKEN_VALIDADE', payload: false});
        }
    }
}