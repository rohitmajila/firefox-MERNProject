import User from '../models/register.js';
import bcrypt from 'bcrypt';

export const loginPost = async (req,res)=>{
 console.log("login")
    try {
        const {email, password}=req.body;
        
        // Validation 
        if( !email || !password){
            return res.status(400).json({message:'Please enter all fields'})
        }

       const user=await User.findOne({email:email});
       if(!user){
           res.status(400).json({message:'No Account with this email registered'})
       }

       const isMatch=await bcrypt.compare(password, user.password);
       if(!isMatch){
           return res.status(400).json({message:"Invalid Credientials"})
       }
      
       res.json({
           user:{
               id:user._id,
               email:user.email,
           }
       })   
        
    } catch (error) {
        res.status(505).json({message:error.message})
        
    }
}

export default loginPost;



