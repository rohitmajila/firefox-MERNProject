import express from 'express';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import config from 'config';
import helmet from 'helmet';
import dotenv from 'dotenv'
import router from './routes/post.js';
import requestLogger from './utilities/requestLogger.js';
import errorLogger from './utilities/errorLogger.js';



// Defining Express 
const app=express();



//Cross origin Access releated Middleware
app.use(cors());



/*
* To handle HTTP POST requests in Express.js version 4 and above, we need to install the middleware module called body-parser.
* body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
* The middleware was a part of Express.js earlier but now we have to install it separately.
* Express version  > 4.16 did not need to seperatly import body-parser. 
* Body parser has been re-added under the methods express.json() and express.urlencoded().
*/
app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}));




//Helmet is a collection of nine smaller middleware functions that set security-related HTTP headers.
//Helmet provides most of its protection by adding headers with restrictive defaults or by removing the unnecessary ones.
//The top-level helmet function is a wrapper around 15 smaller middlewares, 11 of which are enabled by default.
app.use(helmet());
app.use(helmet.frameguard());//frameguard() function to prevent clickjacking




//To connect mongoDB with Express
// const db=config.get('mongoURI');//using config
dotenv.config()
const db=process.env.mongoURI
mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app
    .listen(5000 ,()=>console.log("Server Running on Port 5000")))
    .catch((error)=>console.log(error.message));


//User defind Request Logging Middleware
app.use(requestLogger);    
    
//Defining the Route
app.use('/', router);

//User defined Error Logging Middleware
app.use(errorLogger);

