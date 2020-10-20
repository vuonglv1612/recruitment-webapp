import { combineReducers } from 'redux';
import authReducer from './auth';
import signupReducer from './signup'

const rootReducer = combineReducers({
    authState: authReducer,
    signupState: signupReducer
});

export default rootReducer;