import {USER_DATA} from '../constants/constant';


let initialState={
    userData:null
}
export default function userData(state=initialState, action){
    switch (action.type) {
        case USER_DATA:
            console.log("UserData Reducer", action)
                return{
                    ...state,
                    userData:action.data
                }
            break;
    
        default:
            return state
            break;
    }
    
}