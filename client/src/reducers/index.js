import {combineReducers} from 'redux';
import loggedUser from './authReducer';
import userData from './userDataReducer'
import {CovidBedData} from './covidBedReducer';
// import observerReducer from './observerReducer'

export default combineReducers({
    loggedUser,
    userData,
    CovidBedData,
    // observerReducer
})