import * as types from '../action_types';
import axios from 'axios';
import * as CONSTANTS from 'src/constants/signup';

export function signupRequest() {
    return {
        type: types.SIGNUP_REQUEST
    }
}

export function signupError(error_message) {
    return {
        type: types.SIGNUP_ERROR,
        errorMessage: error_message,
        error: true
    }
}

export function signupSuccess() {
    return {
        type: types.SIGNUP_SUCCESS
    }
}


function handleErrorMessage(response){
    const message = CONSTANTS.status_message_mapping[response.status]
    if(!message){
        return JSON.stringify(response.data.detail)
    }
    return message
}

export function signup(email, password, name, phone_number) {
    return (dispatch) => {
        dispatch(signupRequest())
        axios({
            method: "POST",
            url: CONSTANTS.SIGNUP_API,
            data: {
                email: email,
                password: password,
                name: name,
                phone_number: phone_number
            }
        })
          .then((response) => {
            dispatch(signupSuccess())
          })
          .catch((err) => {console.log(err); dispatch(signupError(handleErrorMessage(err.response)))})
      }
}