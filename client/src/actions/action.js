import {REGISTER_SUCCESS, SET_MESSAGE, REGISTER_FAIL, LOGIN_SUCCESS,LOGOUT} from '../constants/constant';


export const register=(registerData)=>{
  return {
    type:REGISTER_SUCCESS,
    data:registerData
  }
}

export const login=(loginData)=>(dispatch)=>{
  dispatch( {
    type:LOGIN_SUCCESS,
    data:loginData
  })
}

export const logout=()=>(dispatch)=>{
  dispatch( {
    type:LOGOUT,
  })
}


 

