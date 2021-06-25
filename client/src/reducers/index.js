import {combineReducers} from 'redux';
import loggedUser from './authReducer';
import userData from './userDataReducer'
import {CovidBedData} from './covidBedReducer';
import userLoggedUser from './userAuthReducer'


export default combineReducers({
    loggedUser,
    userData,
    CovidBedData,
    userLoggedUser
})