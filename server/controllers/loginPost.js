import User from '../models/register.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import config from 'config'
dotenv.config()


// const JWT_SECRET=config.get('jwtSecret')//using config
const JWT_SECRET=process.env.jwtSecret

export const loginPost = async (req,res)=>{

    try {
        const {email, password}=req.body;
        
        // Validation 
        if( !email || !password){
            return (
                res.send({
                    message:"Please Enter all the fields",
                    status:400
                })
            )
        } 
            
        //Existing user
       const user=await User.findOne({email:email});
       if(!user) {
        return (
            res.send({
                message:"No Account with this Email Registred",
                status:400
            })
        )
       }
           
       //Password validation
       const isMatch=await bcrypt.compare(password, user.password);
       if(!isMatch) {
       return res.send({
           message:"Invalid Credientials"
       })
      }
       

       const token=jwt.sign({id:user._id}, JWT_SECRET, {expiresIn:3600});
       if(!token) throw Error ('Coudnt Sign the token')
       res.json({
           token,
           user:{
               id:user._id,
               name:user.name,
               email:user.email,
               pinCode:user.hosPinCode
           }
       })   
        
    }
     catch (error) {
        res.status(505).json({message:error.message})
        
    }
}

export default loginPost;



