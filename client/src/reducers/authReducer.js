import { REGISTER_SUCCESS, SET_MESSAGE, REGISTER_FAIL, LOGIN_SUCCESS, LOGOUT } from '../constants/constant';


const user = JSON.parse(localStorage.getItem("user"));

const initialState=user?
{isLoggedIn:true, user} 
:
{isLoggedIn:false, user:null} 

export default function loggedUser(state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            console.log("In  reducer register", action)
            return {
                ...state,
                isLoggedIn: false
            }

        case LOGIN_SUCCESS:
            console.log("In  reducer Login", action)
            return {
                ...state,
                isLoggedIn: true,
                user:action.data
            }

            case LOGOUT:
                console.log("In  reducer Logout", action)
                return {
                    ...state,
                    isLoggedIn: false,
                    user:null
                }
        default:
            return state
    }

}