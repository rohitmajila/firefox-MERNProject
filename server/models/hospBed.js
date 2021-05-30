import mongoose from 'mongoose';

const hospitalBedSechma=mongoose.Schema({
    email:{type:String, unique:true},
    phoneNo:{type:String, required:true, unique:true},
    hosName:{type:String},
    totBeds:{type:String},
    ocupBeds:{type:String},
    vacBeds:{type:String},
    icuBeds:{type:String},
    oxygenBed:{type:String},
    normalBed:{type:String},
    hosState:{type:String},
    hosDistrict:{type:String},
    hosPinCode:{type:String},
    hosIsActive:{type:Boolean},
    modified_date:{type: Date, default: Date.now}
});

const HospitalBed=mongoose.model("hospitalBedSechma", hospitalBedSechma);

export default HospitalBed;