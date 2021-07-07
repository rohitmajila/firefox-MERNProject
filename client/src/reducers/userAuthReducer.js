import { USER_REGISTER_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGOUT} from '../constants/constant';


const user = JSON.parse(sessionStorage.getItem("userLoginData"));
const initialState=user?
{isLoggedIn:true, user} 
:
{isLoggedIn:false, user:null} 

export default function userLoggedUser(state = initialState, action) {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            }

        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user:action.data
            }

            case USER_LOGOUT:
                return {
                    ...state,
                    isLoggedIn: false,
                    user:null
                }
        default:
            return state
    }

}