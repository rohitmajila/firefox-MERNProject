import {COVID_BED_DATA} from '../constants/constant'

let initialState={
    covidBedData:null
}
export function CovidBedData(state=initialState, action){
    switch (action.type) {
        case COVID_BED_DATA:
            console.log("COVID BED Dtaa Reducer", action)
            return{
                ...state,
                covidBedData:action.data
            }
            
            break;
    
        default:
            return state
            break;
    }


}