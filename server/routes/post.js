import express from 'express';
import { registerPost} from '../controllers/registerPost.js';
import { loginPost} from '../controllers/loginPost.js';

const router=express.Router();
// router.get('/', getPosts);

router.post('/register', registerPost);
router.post('/login', loginPost)



export default router;