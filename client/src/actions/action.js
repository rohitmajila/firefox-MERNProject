import {REGISTER_SUCCESS, COVID_BED_DATA, USER_DATA,USER_HOME, LOGIN_SUCCESS,
  LOGOUT,USER_REGISTER_SUCCESS,USER_LOGIN_SUCCESS,USER_LOGOUT
  } from '../constants/constant';


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

export const userLogin=(userLoginData)=>(dispatch)=>{
  dispatch( {
    type:USER_LOGIN_SUCCESS,
    data:userLoginData
  })
}

export const userOverviewData=(userData)=>(dispatch)=>{
  dispatch( {
    type:USER_DATA,
    data:userData
  })
}

export const CovidBedData=(covidBedData)=>(dispatch)=>{
  dispatch({
    type:COVID_BED_DATA,
    data:covidBedData
  })
}

export const userHome=(data)=>(dispatch)=>{
  dispatch({
    type:USER_HOME,
    data:data
  })
}

export const logout=()=>(dispatch)=>{
  dispatch( {
    type:LOGOUT,
  })
}

export const userLogout=()=>(dispatch)=>{
  dispatch( {
    type:USER_LOGOUT,
  })
}

 

