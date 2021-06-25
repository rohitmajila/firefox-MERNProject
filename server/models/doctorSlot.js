import mongoose from 'mongoose';
    
const doctorSlotSchema=mongoose.Schema({
    email:{type:String},
    doctorEmail:{type:String},
    fullName:{type:String},
    slotDate:{type:String},
    slotTimeFrom:{type:String},
    slotTimeTo:{type:String}
})

const DoctorSlot=mongoose.model("doctorSlotSchema", doctorSlotSchema);

export default DoctorSlot;