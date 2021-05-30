import express from 'express';
import { registerPost} from '../controllers/registerPost.js';
import { loginPost} from '../controllers/loginPost.js';
import {HospitalBedApi} from '../controllers/HospitalData/HospitalBed.js'
import {GetHospitalBed, GetHospitalBedByEmailId, CombineHosBedByEmailId} from '../controllers/HospitalData/getHospitalBed.js'




const router=express.Router();


router.post('/register', registerPost);
router.post('/login', loginPost);
router.post('/hospitalBed/:email', HospitalBedApi);
router.get('/hospitalBedGet', GetHospitalBed);
router.get('/getHospitalBedByEmailId/:email', CombineHosBedByEmailId);
router.get('/getHospDataByEmailId/:email', GetHospitalBedByEmailId);







export default router;