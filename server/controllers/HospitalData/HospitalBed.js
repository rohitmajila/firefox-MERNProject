import HospitalBed from '../../models/hospBed.js';

export const HospitalBedApi= async(req,res)=>{
    const email= req.params.email
    const checkUser= await HospitalBed.findOne({email:email})
    try {
        if(!checkUser){
            const HospitalBedData=new HospitalBed({
                email:req.body.email,
                hosName:req.body.hosName,
                totBeds:req.body.totBeds,
                ocupBeds:req.body.ocupBeds,
                vacBeds:req.body.vacBeds,
                icuBeds:req.body.icuBeds,
                oxygenBed:req.body.oxygenBed,
                normalBed:req.body.normalBed,
                hosState:req.body.hosState,
                hosDistrict:req.body.hosDistrict,
                hosPinCode:req.body.hosPinCode
            })
            const HospitalData= await HospitalBedData.save();
            if (!HospitalData) throw Error("Something Went Wrong while Posting the data");

            res.status(200).json({
                message: "Data Post Sucessfully",
                id: HospitalData.id,
                email: HospitalData.email
            })
        }
        else{

            const HospitalData=await HospitalBed.findOneAndUpdate({
                email:req.body.email,
                hosName:req.body.hosName,
                totBeds:req.body.totBeds,
                ocupBeds:req.body.ocupBeds,
                vacBeds:req.body.vacBeds,
                icuBeds:req.body.icuBeds,
                oxygenBed:req.body.oxygenBed,
                normalBed:req.body.normalBed,
                hosState:req.body.hosState,
                hosDistrict:req.body.hosDistrict,
                hosPinCode:req.body.hosPinCode
            })

            res.status(200).json({
                message: "Data Post Sucessfully",
                id: HospitalData.id,
                email: HospitalData.email
            })
        }
        
    } catch (error) {
        res.status(505).json({ message: error.message })
    }

}