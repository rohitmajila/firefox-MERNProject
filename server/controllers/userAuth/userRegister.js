import UserData from '../../models/userRegister.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()


export const userRegisterPost=async (req, res)=>{

    const {userName, userEmail, userPhoneNo, userPassword}=req.body
    
try{
    //Validation
    if(!userName||!userEmail||!userPhoneNo||!userPassword){
        return(res.send({message:"Please Enter All Fields",status:400}))
    }

    //Existing Userc
    const existingUSer=await UserData.findOne({userEmail:userEmail});
    if(existingUSer){    
        return(res.send({message:"An Account Already exists", status:400}))  
    }

    // Add new user with sa Password
    const salt=await bcrypt.genSalt();
    const passwordHash=await bcrypt.hash(userPassword,salt);
    const newRegisterUser=new UserData({
        userName,userEmail, userPhoneNo, userPassword:passwordHash
    });
    const saveNewRegisterUser= await newRegisterUser.save();
    if(!saveNewRegisterUser) throw Error("Some thing Went Wrong while saving Data");
    // const JWT_SECRET = process.env.jwtSecret
    const JWT_SECRET="AQUERN_847HDJajddjj980"
    const token=jwt.sign({id:saveNewRegisterUser._id}, JWT_SECRET, {expiresIn:3600});
    res.status(200).json({token, status: 200, userRegister:{id:saveNewRegisterUser._id, userName:saveNewRegisterUser.userName,userEmail:saveNewRegisterUser.userEmail}});
}

catch(error){
    res.status(505).json({message:error})
    }

}