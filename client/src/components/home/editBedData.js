import React, { useState } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";


function UpdateBedData() {
    const covidBedData = useSelector(state => state)
    console.log(covidBedData)
    const [bedValid, setBedValid] = useState("")
    const [bedData, setCovidBedData] = useState({
        email: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.email,
        hosDistrict: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.hosDistrict,
        hosName: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.hosName,
        hosPinCode: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.hosPinCode,
        hosState: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.hosState,
        totBeds: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.totBeds,
        ocupBeds: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.ocupBeds,
        vacBeds: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.vacBeds,
        icuBeds: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.icuBeds,
        oxygenBed: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.oxygenBed,
        normalBed: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.normalBed,
        phoneNo: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.phoneNo,
        hosIsActive: covidBedData?.CovidBedData?.covidBedData?.hospitalBedData?.hosIsActive,
    })

    const handleChange = (type, state, value) => {
        if (type == "input") {
            setCovidBedData((prev) => ({
                ...prev,
                [state]: value
            }));
            if (type === "input" && state === "vacBeds") {
                if (value > 0) setBedValid(true)
                else setBedValid(false)
            }

        }
    }

    const validateData = () => {
        return new Promise((resolve, reject) => {
            let total = bedData.totBeds;
            let occupied = bedData.ocupBeds;
            let vacent = bedData.vacBeds;

            if ((Number(total) === Number(occupied) + Number(vacent)) &&
                (Number(bedData.vacBeds) === Number(bedData.icuBeds) + Number(bedData.oxygenBed) + Number(bedData.normalBed))) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        })

    }

    const submitData = (event) => {
        event.preventDefault();
        const hospitalBedBody = {
            email: bedData.email,
            hosName: bedData.hosName,
            totBeds: bedData.totBeds,
            ocupBeds: bedData.ocupBeds,
            vacBeds: bedData.vacBeds,
            icuBeds: bedData.icuBeds,
            oxygenBed: bedData.oxygenBed,
            normalBed: bedData.normalBed,
            hosState: bedData.hosState,
            hosDistrict: bedData.hosDistrict,
            hosPinCode: bedData.hosPinCode,
            phoneNo:bedData.phoneNo,
            hosIsActive:bedData.hosIsActive
        }
        let body = JSON.stringify(hospitalBedBody)
        let email = bedData.email

        validateData().then(promise => {
            if (promise) {
            setBedValid("")
            const url = `http://localhost:5000/hospitalBed/${email}`
            const headers = {
                'Content-Type': 'application/json',
            }
            axios.post(url, body, { headers: headers }).then(response => {
                console.log(response)
                if (response.status == 200) {
                    window.location.reload()
                }
                else {
                    alert("Error Occured While Submiting Data")
                }
            })
        }
        else{
            setBedValid("Total COVID beds must be equal to Ocupied Beds + Vacent Beds and Vacent beds must be equal to icu beds + oxygen beds + normal beds")
        }
        })
        
    }



    return (
        <React.Fragment>
            <div className="container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label htmlFor="userName">Total COVID Beds</label>
                            <input type="text" class="form-control" onChange={((e) => handleChange("input", "totBeds", e.target.value))} value={bedData.totBeds} />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label htmlFor="userName">Bed Occupied</label>
                            <input type="text" class="form-control" onChange={((e) => handleChange("input", "ocupBeds", e.target.value))} value={bedData.ocupBeds} />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label htmlFor="userName">Vacent COVID Beds </label>
                            <input type="text" class="form-control" onChange={((e) => handleChange("input", "vacBeds", e.target.value))} value={bedData.vacBeds} />
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label htmlFor="userName">ICU COVID Beds</label>
                    <input type="text" class="form-control" onChange={((e) => handleChange("input", "icuBeds", e.target.value))} value={bedData.icuBeds} />
                </div>


                <div class="form-group">
                    <label htmlFor="userName">Oxygen COVID Beds</label>
                    <input type="text" class="form-control" onChange={((e) => handleChange("input", "oxygenBed", e.target.value))} value={bedData.oxygenBed} />
                </div>

                <div class="form-group">
                    <label htmlFor="userName">Normal COVID Beds</label>
                    <input type="text" class="form-control" onChange={((e) => handleChange("input", "normalBed", e.target.value))} value={bedData.normalBed} />
                </div>
        
                <div class="form-group">
                    <button type="submit" class="btn btn-primary" onClick={submitData}>Update Data</button>
                </div>
                {bedValid?<span style={{color:"red"}} >{bedValid ? bedValid:""}</span>:""}
            </div>
            
        </React.Fragment>
    )
}

export default UpdateBedData
