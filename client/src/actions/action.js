import {LOGGED_IN_USER} from '../constants/constant';


export const loggedInUser=(userData)=>{
    console.log("In Actions", userData)
    return {
        type:LOGGED_IN_USER,
        payLoad:userData
    }
    
}
