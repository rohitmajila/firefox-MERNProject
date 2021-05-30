import HospitalBed from '../../models/hospBed.js';

export const HospitalBedApi = async (req, res) => {
    const email = req.params.email
    const checkUser = await HospitalBed.findOne({ email: email })
    try {
        if (!checkUser) {
            const HospitalBedData = new HospitalBed({
                email: req.body.email,
                hosName: req.body.hosName,
                totBeds: req.body.totBeds,
                ocupBeds: req.body.ocupBeds,
                vacBeds: req.body.vacBeds,
                icuBeds: req.body.icuBeds,
                oxygenBed: req.body.oxygenBed,
                normalBed: req.body.normalBed,
                hosState: req.body.hosState,
                hosDistrict: req.body.hosDistrict,
                hosPinCode: req.body.hosPinCode,
                phoneNo: req.body.phoneNo,
                hosIsActive: req.body.hosIsActive
            })
            const HospitalData = await HospitalBedData.save();
            if (!HospitalData) throw Error("Something Went Wrong while Posting the data");

            res.status(200).json({
                message: "Data Post Sucessfully",
                id: HospitalData.id,
                email: HospitalData.email
            })
        }
        else {
                checkUser.email = req.body.email,
                checkUser.hosName = req.body.hosName,
                checkUser.totBeds = req.body.totBeds,
                checkUser.ocupBeds = req.body.ocupBeds,
                checkUser.vacBeds = req.body.vacBeds,
                checkUser.icuBeds = req.body.icuBeds,
                checkUser.oxygenBed = req.body.oxygenBed,
                checkUser.normalBed = req.body.normalBed,
                checkUser.hosState = req.body.hosState,
                checkUser.hosDistrict = req.body.hosDistrict,
                checkUser.hosPinCode = req.body.hosPinCode,
                checkUser.phoneNo = req.body.phoneNo,
                checkUser.hosIsActive = req.body.hosIsActive

            checkUser.save().then(checkUser => {
                res.status(200).json("HospitalBed Data Updated")
            })
        }

    } catch (error) {
        res.status(505).json({ message: error.message })
    }

}