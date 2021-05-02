import HospitalBed from '../../models/hospBed.js';
import User from '../../models/register.js';

export const GetHospitalBed=async(req,res)=>{
    try {
        const data=await HospitalBed.find()
        if(!data) throw Error("No Data Found");

        res.status(200).json({hospitalData:data})
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const GetHospitalBedByEmailId=async(req, res)=>{
    try {
        const email=req.params.email
        const hospitalData=await HospitalBed.findOne({email:email})
        
        const reegisterData=await User.findOne({email:email})

        if(!hospitalData && !reegisterData) throw Error("No data Found")

        res.status(200).json({
            hospitalBedData:hospitalData,
            reegisterData:reegisterData
        })
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}