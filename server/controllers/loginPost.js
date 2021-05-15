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
        if( !email || !password) throw Error ('Please enter all fields') 
            
        
       const user=await User.findOne({email:email});
       if(!user) throw Error ('No Account with this email registered') 
           
       
       const isMatch=await bcrypt.compare(password, user.password);
       if(!isMatch) throw Error ('Invalid Credientials') 
       

       const token=jwt.sign({id:user._id}, JWT_SECRET, {expiresIn:3600});
       if(!token) throw Error ('Coudnt Sign the token')
      
       res.json({
           token,
           user:{
               id:user._id,
               name:user.name,
               email:user.email,
           }
       })   
        
    }
     catch (error) {
        res.status(505).json({message:error.message})
        
    }
}

export default loginPost;



