import express from 'express';
import { registerPost} from '../controllers/registerPost.js';
import { loginPost} from '../controllers/loginPost.js';
import {PostDoctorData,GetDoctorData} from '../controllers/doctorRoster/doctorData.js';
import {HospitalBedApi} from '../controllers/HospitalData/HospitalBed.js';
import {userRegisterPost} from '../controllers/userAuth/userRegister.js';
import {UserLoginPost}  from '../controllers/userAuth/userLogin.js';
import {GetHospitalBed, GetHospitalBedByEmailId, CombineHosBedByEmailId} from '../controllers/HospitalData/getHospitalBed.js';

const router=express.Router();

router.post('/login', loginPost);
router.post('/register', registerPost);
router.post('/userLogin', UserLoginPost);
router.post('/userRegister', userRegisterPost);
router.post('/hospitalBed/:email', HospitalBedApi);
router.post('/doctorData/:doctorEmail', PostDoctorData);
router.get('/allDoctorData/:email', GetDoctorData);
router.get('/hospitalBedGet', GetHospitalBed);
router.get('/getHospitalBedByEmailId/:email', CombineHosBedByEmailId);
router.get('/getHospDataByEmailId/:email', GetHospitalBedByEmailId);







export default router;