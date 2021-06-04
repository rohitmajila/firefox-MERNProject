import { REGISTER_SUCCESS, SET_MESSAGE, REGISTER_FAIL, LOGIN_SUCCESS, LOGOUT } from '../constants/constant';


const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user)
const initialState=user?
{isLoggedIn:true, user} 
:
{isLoggedIn:false, user:null} 

export default function loggedUser(state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user:action.data
            }

            case LOGOUT:
                return {
                    ...state,
                    isLoggedIn: false,
                    user:null
                }
        default:
            return state
    }

}