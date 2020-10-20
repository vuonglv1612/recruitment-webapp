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
    }
};


export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            console.log("LOGIN")
            return {
                ...state,
                identities: {...action.identities, logged_on: true}
            }
        case types.LOGOUT:
            console.log("LOGOUT")
            return initialState
        default:
            return state;
    }
}
