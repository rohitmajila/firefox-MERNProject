import DoctorData from '../../models/doctorData.js';


export const PostDoctorData=async (req, res)=>{
    const doctorEmail=req.params.doctorEmail
    const checkDoctor=await DoctorData.findOne({doctorEmail:doctorEmail});
    try{
        if(!checkDoctor){
        const HospitalDoctorData= new DoctorData({
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            fullName:req.body.fullName,
            dateOfBirth:req.body.dateOfBirth,
            doctorEmail:req.body.doctorEmail,
            phoneNumber:req.body.phoneNumber,
            bloodGroup:req.body.bloodGroup,
            graduationCollege:req.body.graduationCollege,
            graduationPercentage:req.body.graduationPercentage,
            masterCollege:req.body.masterCollege,
            masterPercentage:req.body.masterPercentage,
            totalExperience:req.body.totalExperience,
            departName:req.body.departName,
            specilzation:req.body.specilzation,
            docDescription:req.body.docDescription,
            researchDescription:req.body.researchDescription
        })

        const DoctorHosData= await HospitalDoctorData.save();
        if(!DoctorHosData) throw Error("Something Went Wrong")
        res.status(200).json({
            message: "Data Post Sucessfully",
            id: DoctorHosData.id,
            docEmail: DoctorHosData.doctorEmail
        })
    }
    else{
        checkDoctor.email=req.body.email,
        checkDoctor.firstName=req.body.firstName,
        checkDoctor.lastName=req.body.lastName,
        checkDoctor.fullName=req.body.fullName,
        checkDoctor.dateOfBirth=req.body.dateOfBirth,
        checkDoctor.doctorEmail=req.body.doctorEmail,
        checkDoctor.phoneNumber=req.body.phoneNumber,
        checkDoctor.bloodGroup=req.body.bloodGroup,
        checkDoctor.graduationCollege=req.body.graduationCollege,
        checkDoctor.graduationPercentage=req.body.graduationPercentage,
        checkDoctor.masterCollege=req.body.masterCollege,
        checkDoctor.masterPercentage=req.body.masterPercentage,
        checkDoctor.totalExperience=req.body.totalExperience,
        checkDoctor.departName=req.body.departName,
        checkDoctor.specilzation=req.body.specilzation,
        checkDoctor.docDescription=req.body.docDescription,
        checkDoctor.researchDescription=req.body.researchDescription

        const DoctorHosData=await checkDoctor.save();
        if(!DoctorHosData) throw Error("Error Occured While Updating Data")

        res.status(200).json({
            message:"Doctor Data Updated Sucessfully",
            id:DoctorHosData.id,
            docEmail:DoctorHosData.doctorEmail
        })
    }
    }

    catch(error){
        res.status(505).json({ message: error.message })
    }


}

export const GetDoctorData=async(req,res)=>{
    try{
        const email=req.params.email
        const allDoctorData=await DoctorData.find({email:email})
        if(!allDoctorData) throw Error("No Data Found")
        else{
        res.status(200).json({allDoctorData:allDoctorData})
        }
    }
    catch(error){
        res.status(400).json({msg: error.message})
    }
 }   
