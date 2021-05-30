import {combineReducers} from 'redux';
import loggedUser from './authReducer';
import userData from './userDataReducer'
import {CovidBedData} from './covidBedReducer';


export default combineReducers({
    loggedUser,
    userData,
    CovidBedData,
})