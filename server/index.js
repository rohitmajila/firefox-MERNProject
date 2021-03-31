import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/post.js';

const app=express();

app.use('/posts', postRoutes);

/*
* To handle HTTP POST requests in Express.js version 4 and above, we need to install the middleware module called body-parser.
* body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
* The middleware was a part of Express.js earlier but now we have to install it separately.
*/
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))



//To connect mongoDB with Express
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log("Server Running on Port 5000")))
    .catch((error)=>console.log(error.message));

//To remove the warning related to Mongo DB from console
mongoose.set('useFindAndModify', false)