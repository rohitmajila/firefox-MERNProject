import mongoose from 'mongoose';

const hospitalBedSechma=mongoose.Schema({
    email:{type:String, unique:true},
    hosName:{type:String},
    totBeds:{type:String},
    ocupBeds:{type:String},
    vacBeds:{type:String},
    hosState:{type:String},
    hosDistrict:{type:String},
    hosPinCode:{type:String},
    modified_date:{type: Date, default: Date.now}
});

const HospitalBed=mongoose.model("hospitalBedSechma", hospitalBedSechma);

export default HospitalBed;