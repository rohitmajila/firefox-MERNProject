import User from '../models/register.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config'


const JWT_SECRET=config.get('jwtSecret')

export const registerPost = async (req,res)=>{
 
    try {
        const {name, email, password}=req.body;
        // Validation 
        if(!name || !email || !password)
        return(
            res.send({
                message:"Please enter all the fields",
                status:400
            })
        )

        // Check for Existing User
        const existingUser= await User.findOne({email:email});
        if(existingUser){
            return(
            res.send({
                message:"An Account Already exists",
                status:400
            })
            )
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
        if (!saveUser) throw Error('Something went wrong saving the user');

        const token = jwt.sign({ id: saveUser._id }, JWT_SECRET, {
            expiresIn: 3600
          });

          res.status(200).json({
            token,
            user: {
              id: saveUser.id,
              name: saveUser.name,
              email: saveUser.email
            }
          });

        
    } 
    catch (error) {
        res.status(505).json({message:error})
        
    }
}

export default registerPost;



