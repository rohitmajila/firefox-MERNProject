import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import config from 'config'
import router from './routes/post.js';


// Defining Express 
const app=express();

/*
* To handle HTTP POST requests in Express.js version 4 and above, we need to install the middleware module called body-parser.
* body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
* The middleware was a part of Express.js earlier but now we have to install it separately.
*/
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());



//To connect mongoDB with Express
const db=config.get('mongoURI')
mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(5000 ,()=>console.log("Server Running on Port 5000")))
    .catch((error)=>console.log(error.message));

//Defining the Route
app.use('/', router);

//To remove the warning related to Mongo DB from console
mongoose.set('useFindAndModify', false)