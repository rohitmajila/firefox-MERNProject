import mongoose from 'mongoose';


const userDataSchema=mongoose.Schema({
    userName:{type:String, requireed:true},
    userEmail:{type:String, requireed:true, unique:true},
    userPhoneNo:{type:Number, requireed:true, unique:true},
    userPassword:{type:String, requireed:true, unique:true}
});

const UserData=mongoose.model("userDataSchema", userDataSchema);

export default UserData