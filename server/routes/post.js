import express from 'express';
import { registerPost} from '../controllers/registerPost.js';
import { loginPost} from '../controllers/loginPost.js';
import {userOverviewPost} from '../controllers/userOverview/userOverviewPost.js';
import {userOverviewGet} from '../controllers/userOverview/userOverviewGet.js'

const router=express.Router();


router.post('/register', registerPost);
router.post('/login', loginPost);
router.post('/userOverviewPost/:email', userOverviewPost);
router.get('/userOverviewGet/:email', userOverviewGet)





export default router;