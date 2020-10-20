import * as types from 'src/redux/action_types';

const initialState = {
    identities: {
        logged_on: false,
        id: null,
        email: null,
        name: null,
        user_type: null,
        access_token: null,
        employer_id: null,
        employee_id: null
    },
    loginReqesting: false,
    loginDone: false,
    error: false,
    errorMessage: ""
};


export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            console.log("LOGIN_REQUEST")
            return {
                ...state,
                loginReqesting: true
            }
        case types.LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS")
            return {
                ...state,
                loginReqesting: false,
                loginDone: true,
                identities: {...action.identities, logged_on: true}
            }
        case types.LOGIN_ERROR:
            console.log("LOGIN_ERROR")
            return {
                ...state,
                loginReqesting: false,
                loginDone: true,
                error: action.error,
                errorMessage: action.errorMessage
            }
        case types.LOGOUT:
            console.log("LOGOUT")
            return initialState
        default:
            return state;
    }
}
