import fs from 'fs';//Importing File System Module

let requestLogger=(req,res,next)=>{
    let logMessage=new Date().toDateString()+ " " + req.method+ " "+req.url + "\n";
    fs.appendFile('RequestLogger.txt', logMessage, (err)=>{
        if(err) return next(err);
    });
    next();

}

export default requestLogger;
