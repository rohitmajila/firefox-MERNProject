import {combineReducers} from 'redux';
import loggedUser from './authReducer';
import userData from './userDataReducer'

export default combineReducers({
    loggedUser,userData
})