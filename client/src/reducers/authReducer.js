import {LOGGED_IN_USER} from '../constants/constant';


export default function loggedUser(state=[], action){
    switch(action.type){
        case LOGGED_IN_USER:
            console.log("In  reducer", action)
            return{
                ...state,
                userData:action.payLoad
            }

        default:
            return state
    }

}