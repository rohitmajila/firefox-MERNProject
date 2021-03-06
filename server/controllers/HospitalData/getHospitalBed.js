import HospitalBed from '../../models/hospBed.js';
import User from '../../models/register.js';

export const GetHospitalBed=async(req,res)=>{
    try {
        const data=await HospitalBed.find()
        if(!data) throw Error("No Data Found");

        res.status(200).json({hospitalData:data, status:200})
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const CombineHosBedByEmailId=async(req, res)=>{
    try {
        const email=req.params.email
        const hospitalData=await HospitalBed.findOne({email:email})
        
        const registeredData=await User.findOne({email:email})

        if(!hospitalData && !registeredData) throw Error("No data Found")

        res.status(200).json({
            hospitalBedData:hospitalData,
            reegisterData:registeredData
        })
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}


export const GetHospitalBedByEmailId=async(req, res)=>{
    try {
        const email=req.params.email
        const hospitalData=await HospitalBed.findOne({email:email})
        
        if(!hospitalData) throw Error("No data Found")

        res.status(200).json({
            hospitalBedData:hospitalData,
        })
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

export const GetHospitalByHosPinCode=async(req,res)=>{
    try{
        const hosPinCode=req.params.hosPinCode
        const hospitalData=await HospitalBed.find({hosPinCode:hosPinCode})
        if(!hospitalData) throw Error("No Data Found")
        else{
        res.status(200).json({hospitalData:hospitalData, status:200})
        }
    }
    catch(error){
        res.status(400).json({msg: error.message})
    }
 }  