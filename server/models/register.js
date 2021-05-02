import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String,required: true, unique: true},
    password: {type: String, required: true},
    hosState: {type: String, required: true},
    hosDistrict: {type: String, required: true},
    hosPinCode: {type: String, required: true},
    register_date: { type: Date, default: Date.now},
    }); 

const User=mongoose.model('User', userSchema);

export default User;