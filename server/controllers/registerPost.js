import User from '../models/register.js';
import bcrypt from 'bcrypt';

export const registerPost = async (req,res)=>{
 
    try {
        const {name, email, password}=req.body;
        // Validation 
        if(!name || !email || !password){
            return res.status(400).json({message:'Please enter all fields'})
        }

        // Check for Existing User
        const existingUser= await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:'An Account Already exists'});
        }

        // Add new user whith encrypted password
        const salt=await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password, salt);
        
        const newUser=new User({
            name,
            email,
            password:passwordHash
        })

        const saveUser=await newUser.save();
        res.json(saveUser)

        
    } catch (error) {
        res.status(505).json({message:error.message})
        
    }
}

export default registerPost;



