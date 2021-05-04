import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";


function UserHomePage() {
    const history = useHistory()
    const userData = useSelector(state => state)
    const [bedValid, setBedValid] = useState("")
    const [vacBedModal, setVacBedModal]=useState(false)
    const [hosBed, setHosBed] = useState({
        email: userData?.loggedUser?.user?.user?.email,
        hosName: userData?.loggedUser?.user?.user?.name,
        totBeds: null,
        ocupBeds: null,
        vacBeds: null,
        icuBeds:null,
        oxygenBed:null,
        normalBed:null,
        hosState: null,
        hosDistrict: null,
        hosPinCode: null
    })

    const currentUser = useSelector(state => state.loggedUser.isLoggedIn)


    const handleChange = (type, state, value) => {
        if (type == "input") {
            setHosBed((prev) => ({
                ...prev,
                [state]: value
            }));
        if(type==="input" && state==="vacBeds"){
            if(value>0) setVacBedModal(true)
            else setVacBedModal(false)       
        }
        
        }       
    }


    React.useEffect(() => {
        const email = userData?.loggedUser?.user?.user?.email
        console.log(email)
        const url = `http://localhost:5000/getHospitalBedByEmailId/${email}`
        axios.get(url)
            .then(response => {
                if (response.status == 200) {
                    console.log(response)
                    setHosBed({
                        totBeds: response?.data?.hospitalBedData?.totBeds,
                        ocupBeds: response?.data?.hospitalBedData?.ocupBeds,
                        vacBeds: response?.data?.hospitalBedData?.vacBeds,
                        icuBeds: response?.data?.hospitalBedData?.icuBeds,
                        oxygenBed: response?.data?.hospitalBedData?.oxygenBed,
                        normalBed: response?.data?.hospitalBedData?.normalBed,
                        hosState: response?.data?.reegisterData?.hosState,
                        hosDistrict: response?.data?.reegisterData?.hosDistrict,
                        hosPinCode: response?.data?.reegisterData?.hosPinCode,
                    })
                }

                if(response?.data?.hospitalBedData?.vacBeds>0){
                    setVacBedModal(true)
                }

            })
    }, [])

    const submitData = (event) => {
        event.preventDefault();
        const hospitalBedBody = {
            email: userData?.loggedUser?.user?.user?.email,
            hosName: userData?.loggedUser?.user?.user?.name,
            totBeds: hosBed.totBeds,
            ocupBeds: hosBed.ocupBeds,
            vacBeds: hosBed.vacBeds,
            icuBeds: hosBed.icuBeds,
            oxygenBed: hosBed.oxygenBed,
            normalBed: hosBed.normalBed,
            hosState: hosBed.hosState,
            hosDistrict: hosBed.hosDistrict,
            hosPinCode: hosBed.hosPinCode
        }
        let body = JSON.stringify(hospitalBedBody)
        let total = hosBed.totBeds
        let occupied = hosBed.ocupBeds;
        let vacent = hosBed.vacBeds
        let email = userData?.loggedUser?.user?.user?.email

        if (Number(total) === Number(occupied) + Number(vacent)) {
            setBedValid("")
            const url = `http://localhost:5000/hospitalBed/${email}`
            const headers = {
                'Content-Type': 'application/json',
            }
            console.log(body)
            console.log(email)
            axios.post(url, body, { headers: headers }).then(response => {
                console.log(response)
                if (response.status == 200) {
                    history.replace('/hospitalData')
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
            <h1>Welcome {userData?.loggedUser?.user?.user?.name}</h1>
            <form>
                <div class="row">
                    <div class="col-md-4 offset-md-1">
                        <div class="card">

                            <div class="form-group">
                                <label htmlFor="userName">Hospital Name</label>
                                <input type="text" class="form-control" disabled value={userData?.loggedUser?.user?.user?.email} />
                            </div>

                            <div class="form-group">
                                <label htmlFor="totBeds">Total No of COVID Beds</label>
                                <input class="form-control" type="number" min={0} onChange={((e) => handleChange("input", "totBeds", e.target.value))} value={hosBed.totBeds} />
                            </div>

                            <div class="form-group">
                                <label htmlFor="ocupBeds">Bed Occupied</label>
                                <input class="form-control" type="number" min={0} onChange={((e) => handleChange("input", "ocupBeds", e.target.value))} value={hosBed.ocupBeds} />
                            </div>

                            <div class="form-group">
                                <label htmlFor="vacBeds">Bed Vacent</label>
                                <input class="form-control" type="number" min={0} onChange={((e) => handleChange("input", "vacBeds", e.target.value))} value={hosBed.vacBeds} />
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-primary" onClick={submitData}>Register</button><br />
                                <span style={{ color: "red" }}>{bedValid ? bedValid : ""}</span>
                            </div>
                        </div>
                    </div>
                
               {vacBedModal?
                    <div class="col-md-4 offset-md-1">
                        <div class="card">
                        <div class="form-group">
                                <label htmlFor="vacBeds">Vacent COVID Bed</label>
                                <input class="form-control" type="number" min={0} disabled value={hosBed.vacBeds} />
                        </div>

                        <div class="form-group">
                                <label htmlFor="vacBeds">ICU COVID Beds</label>
                                <input class="form-control" type="number" min={0} onChange={((e) => handleChange("input", "icuBeds", e.target.value))} value={hosBed.icuBeds} />
                        </div>

                        <div class="form-group">
                                <label htmlFor="vacBeds">Oxygen COVID Beds</label>
                                <input class="form-control" type="number" min={0} onChange={((e) => handleChange("input", "oxygenBed", e.target.value))} value={hosBed.oxygenBed} />
                        </div>

                        <div class="form-group">
                                <label htmlFor="vacBeds">Normal COVID Beds</label>
                                <input class="form-control" type="number" min={0} onChange={((e) => handleChange("input", "normalBed", e.target.value))} value={hosBed.normalBed} />
                        </div>

                        </div>
                        </div>
                            :
                            ""
                }
                            </div>         
                    </form>
        </React.Fragment>
    )

}
export default UserHomePage