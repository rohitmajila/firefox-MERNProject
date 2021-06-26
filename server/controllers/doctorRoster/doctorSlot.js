import DoctorSlot from '../../models/doctorSlot.js';

export const PostDoctorSlotData = async (req, res) => {
    const insertSlotData = new DoctorSlot({
        email: req.body.email,
        doctorEmail: req.body.doctorEmail,
        fullName: req.body.fullName,
        slotDate: req.body.slotDate,
        slotTimeFrom: req.body.slotTimeFrom,
        slotTimeTo: req.body.slotTimeTo,
        bookStatus: req.body.bookStatus
    })
    const doctorSlotData = await insertSlotData.save();
    if (!doctorSlotData) throw Error("Something Went Wrong")
    res.status(200).json({ message: "Data Post Sucessfully", id: doctorSlotData.id, doctorEmail: doctorSlotData.doctorEmail })
}

export const UpdateDoctorSlotData=async (req,res)=>{
    const _id=req.params._id;
    const upadateData= await DoctorSlot.findByIdAndUpdate(_id, req.body, { useFindAndModify: false });
    const upadateSlotData=await upadateData.save();
    if(!upadateSlotData) throw Error("Something Went Wrong")
    res.status(200).json({message:"Data updated Sucessfullt", id:upadateSlotData._id, doctorEmail:upadateSlotData.doctorEmail})
}

export const GetDoctorSlotData = async (req, res) => {
    let doctorEmail = req.params.doctorEmail;
    let today = new Date();
    let year = today.getFullYear();
    let mon = today.getMonth() + 1;
    let day = today.getDate();
    let todayDate = year + "-" + mon + "-" + day
    const doctorSlotData = await DoctorSlot.find({ $and:[{"slotDate": {$gte:todayDate}},{doctorEmail:doctorEmail}]})
    if (!doctorSlotData) throw Error("No Data Found")
    res.status(200).json({ message: "Data fetch Sucessfully", status:200, doctorSlotData: doctorSlotData })
}


