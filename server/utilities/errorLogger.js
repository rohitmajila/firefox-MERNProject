import fs from 'fs';

let errorLogger=(err,res,req,next)=>{
    if(err){
        let errorLog=new Date().toDateString() +" - " + err.stack + "\n" ;
        fs.appendFile('ErrorLogger.txt', errorLog, (errro)=>{
            if(error){
                console.log("Logging Error Filed");
            }
        });
        if(err.status){
            res.status(err.status);
        }
        else{
            res.status(500);
        }

        res.json({"message":err.message})
    }
    next();
}

export default errorLogger;