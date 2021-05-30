import { COVID_BED_DATA, USER_HOME } from '../constants/constant'

let initialState = {
    covidBedData: null,
    userHome:null
}
export function CovidBedData(state = initialState, action) {
    switch (action.type) {
        case COVID_BED_DATA:
            console.log("COVID BED Dtaa Reducer", action)
            return {
                ...state,
                covidBedData: action.data,
                userHome:true
            }

        case USER_HOME:
            console.log("USER HOME", action)
            return {
                ...state,
                userHome: true
            }


        default:
            return state
            
    }


}