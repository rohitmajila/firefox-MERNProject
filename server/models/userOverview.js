import mongoose from 'mongoose';

const userOverviewSchems=mongoose.Schema({
    introduction:{
        type:String
    },
    language:{
        type:String
    },
    discipline:{
        type:String
    },
    skills:{
        type:String
    },
    email: {
        type: String,
        required: true,
        unique: true
      },
    modifiedDate:{
        type:Date,
        default:Date.now()
    }
});

const userOverview=mongoose.model("userOverview", userOverviewSchems);

export default userOverview