import * as types from 'src/redux/action_types';
import axios from 'axios';
import * as CONSTANTS from 'src/constants/login';

export function loginRequest() {
    return {
        type: types.LOGIN_REQUEST
    }
}

export function loginError(error_message) {
    return {
        type: types.LOGIN_ERROR,
        errorMessage: error_message,
        error: true
    }
}

export function loginSuccess(identities) {
    return {
        type: types.LOGIN_SUCCESS,
        identities: identities
    }
}
export function logoutAction() {
    return {
        type: types.LOGOUT
    };
}

function handleErrorMessage(response){
    const message = JSON.stringify(response.data.detail)
    if(message === ""){
        message = CONSTANTS.status_message_mapping[response.status]
    }
    return message
}

export function login(email, password) {
    return (dispatch) => {
        dispatch(loginRequest())
        axios({
            method: "POST",
            url: CONSTANTS.LOGIN_API,
            data: {
                email: email,
                password: password
            }
        })
          .then((response) => {
            dispatch(loginSuccess(response.data))
          })
          .catch((err) => {dispatch(loginError(handleErrorMessage(err.response)))})
      }
}