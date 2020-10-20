import * as types from 'src/redux/action_types';


export function saveIdentities(identities) {
    return {
        type: types.LOGIN,
        identities: identities
    }
}


export function logoutAction() {
    return {
        type: types.LOGOUT
    };
}
