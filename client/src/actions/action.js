import {REGISTER_SUCCESS, COVID_BED_DATA, USER_DATA, LOGIN_SUCCESS,LOGOUT} from '../constants/constant';


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

export const userOverviewData=(userData)=>(dispatch)=>{
  dispatch( {
    type:USER_DATA,
    data:userData
  })
}

export const CovidBedData=(covidBedData)=>(dispatch)=>{
  console.log("COVID BED Dtaa", covidBedData)
  dispatch({
    type:COVID_BED_DATA,
    data:covidBedData
  })
}

export const logout=()=>(dispatch)=>{
  dispatch( {
    type:LOGOUT,
  })
}


 

