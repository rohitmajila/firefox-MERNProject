import mongoose from 'mongoose';

const doctorDataSchema=mongoose.Schema({
    email:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    fullName:{type:String},
    dateOfBirth:{type:Date},
    doctorEmail:{type:String},
    phoneNumber:{type:Number},
    bloodGroup:{type:String},
    graduationCollege:{type:String},
    graduationPercentage:{type:Number},
    masterCollege:{type:String},
    masterPercentage:{type:Number},
    totalExperience:{type:Number},
    departName:{type:String},
    specilzation:{type:String},
    docDescription:{type:String},
    researchDescription:{type:String},
})

const DoctorData=mongoose.model("doctorDataSchema", doctorDataSchema);

export default DoctorData;