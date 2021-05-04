import React, { useState } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";


function UpdateBedData() {
    const covidBedData = useSelector(state => state)
    const [bedValid, setBedValid] = useState("")
    const [vacBedValid, setVacBedValid]=useState("")
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
            hosPinCode: bedData.hosPinCode
        }
        let body = JSON.stringify(hospitalBedBody)
        let total = bedData.totBeds
        let occupied = bedData.ocupBeds;
        let vacent = bedData.vacBeds
        let icuBeds= bedData.icuBeds
        let oxygenBed=bedData.oxygenBed
        let normalBed= bedData.normalBed
        let email = bedData.email

        if(Number(vacent)===Number(icuBeds)+Number(oxygenBed)+ Number(normalBed)){
            setVacBedValid("")
        }
        else{
            setVacBedValid("Total Vacent beds must be equal to ICU Beds + oxygen Beds + Normal Bed")
        }

        if ((Number(total) === Number(occupied) + Number(vacent)) && vacBedValid=="") {
            setBedValid("")
            const url = `http://localhost:5000/hospitalBed/${email}`
            const headers = {
                'Content-Type': 'application/json',
            }
            axios.post(url, body, { headers: headers }).then(response => {
                console.log(response)
                if (response.status == 200) {
                    console.log(response)
                }
                else {
                    alert("Error Occured While Submiting Data")
                }
            })
        }
        else {
            setBedValid("Total COVID beds must be equal to Ocupied Beds + Vacent Beds")
        }
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
                    <button type="submit" class="btn btn-primary" onClick={submitData}>Update Data</button><br/>
                    <span style={{ color: "red" }}>{bedValid ? bedValid:vacBedValid?vacBedValid:""}</span><br />
                </div>
            </div>
        </React.Fragment>
    )
}

export default UpdateBedData
