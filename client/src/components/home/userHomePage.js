import React, { useState } from 'react';
import axios from 'axios';
import {userHome }from '../../actions/action';
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './home.css';


function UserHomePage(props) {
    const dispatch=useDispatch();
    const history = useHistory()
    const userData = useSelector(state => state)
    const [bedValid, setBedValid] = useState("")
    const [vacBedModal, setVacBedModal] = useState(false)
    const [hosBed, setHosBed] = useState({
        email: userData?.loggedUser?.user?.user?.email,
        hosName: userData?.loggedUser?.user?.user?.name,
        phoneNo:null,
        totBeds: null,
        ocupBeds: null,
        vacBeds: null,
        icuBeds: null,
        oxygenBed: null,
        normalBed: null,
        hosState: null,
        hosDistrict: null,
        hosPinCode: null,
        hosIsActive:null
    })

    const currentUser = useSelector(state => state.loggedUser.isLoggedIn)


    const handleChange = (type, state, value) => {
        if (type === "input") {
            setHosBed((prev) => ({
                ...prev,
                [state]: value
            }));


            if (type === "input" && state === "vacBeds") {
                if (value > 0) setVacBedModal(true)
                else setVacBedModal(false)
            }

        }
    }


    React.useEffect(() => {
        const email = userData?.loggedUser?.user?.user?.email
        const url = `http://65.1.109.236:5000/getHospitalBedByEmailId/${email}`
        axios.get(url)
            .then(response => {
                console.log(response)
                if (response.status == 200) {
                    console.log(response)
                    setHosBed({
                        hosIsActive:response?.data?.hospitalBedData?.hosIsActive,
                        hosState:response?.data?.reegisterData?.hosState,
                        hosDistrict:response?.data?.reegisterData?.hosDistrict,
                        hosPinCode:response?.data?.reegisterData?.hosPinCode,
                        phoneNo:response?.data?.reegisterData?.phoneNo,

                    })
                }

                if (response?.data?.hospitalBedData?.vacBeds > 0) {
                    setVacBedModal(true)
                }

            })
    }, [])

    const validateData = () => {
        return new Promise((resolve, reject) => {
            let total = hosBed.totBeds;
            let occupied = hosBed.ocupBeds;
            let vacent = hosBed.vacBeds;

            if ((Number(total) === Number(occupied) + Number(vacent)) &&
                (Number(hosBed.vacBeds) === Number(hosBed.icuBeds) + Number(hosBed.oxygenBed) + Number(hosBed.normalBed))) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        })

    }

    const submitData = async (event) => {
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
            hosPinCode: hosBed.hosPinCode,
            phoneNo:hosBed.phoneNo,
            hosIsActive:true
        }
        let body = JSON.stringify(hospitalBedBody)
        let email = userData?.loggedUser?.user?.user?.email

        validateData().then(promise => {
            if (promise) {
                setBedValid("")
                const url = `http://65.1.109.236:5000/hospitalBed/${email}`
                const headers = {
                    'Content-Type': 'application/json',
                }
                axios.post(url, body, { headers: headers }).then(response => {
                    console.log(response)
                    if (response.status == 200) {
                        dispatch(userHome(true))
                       
                    }
                    else {
                        alert("Error Occured While Submiting Data")
                    }
                })
            }
            else {
                setBedValid("Total COVID beds must be equal to Ocupied Beds + Vacent Beds and Vacent beds must be equal to icu beds + oxygen beds + normal beds")
            }
        })
    }

    if(hosBed.hosIsActive){
        return <Redirect to="/hospitalData" />
    }

    return (
        <React.Fragment>
            <div className="backgroundImage">
                <h1 className="text-light">Welcome {userData?.loggedUser?.user?.user?.name}</h1><br />
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4 offset-md-1">
                        <div className="form-text text-light headerStyle">Hospital Bed Data</div>
                        <div class="card cardStyle">
                            <div class="form-group">
                                <label htmlFor="userName" >Hospital Name</label>
                                <input type="text" class="form-control" disabled value={userData?.loggedUser?.user?.user?.email} />
                            </div>

                            <div class="form-group">
                                <label htmlFor="totBeds" >Total No of COVID Beds</label>
                                <input class="form-control" type="number" min={0} onChange={((e) => handleChange("input","totBeds", e.target.value))} value={hosBed.totBeds} />
                            </div>

                            <div class="form-group">
                                <label htmlFor="ocupBeds" >Bed Occupied</label>
                                <input class="form-control" type="number" min={0} onChange={((e) => handleChange("input", "ocupBeds", e.target.value))} value={hosBed.ocupBeds} />
                            </div>

                            <div class="form-group">
                                <label htmlFor="vacBeds" >Bed Vacent</label>
                                <input class="form-control" type="number" min={0} onChange={((e) => handleChange("input", "vacBeds", e.target.value))} value={hosBed.vacBeds} />
                            </div>
                            <br />
                           
                        </div><br/>
                        <div class="form-group">
                                <button type="submit" class="btn btn-primary" onClick={submitData}>Submit</button>
                            </div>
                        </div>

                        {vacBedModal?
                            <div class="col-md-4 offset-md-2 ">
                                <div className="form-text text-light headerStyle">Vacent Bed Data</div>
                                 <div class="card cardStyle">
                                <div class="form-group">
                                    <label htmlFor="vacBeds" >Vacent COVID Bed</label>
                                    <input class="form-control" type="number" min={0} disabled value={hosBed.vacBeds} />
                                </div>

                                <div class="form-group">
                                    <label htmlFor="vacBeds" >ICU COVID Beds</label>
                                    <input class="form-control" type="number" min={0} onChange={((e) => handleChange("input", "icuBeds", e.target.value))} value={hosBed.icuBeds} />
                                </div>

                                <div class="form-group">
                                    <label htmlFor="vacBeds" >Oxygen COVID Beds</label>
                                    <input class="form-control" type="number" min={0} onChange={((e) => handleChange("input", "oxygenBed", e.target.value))} value={hosBed.oxygenBed} />
                                </div>

                                <div class="form-group">
                                    <label htmlFor="vacBeds" >Normal COVID Beds</label>
                                    <input class="form-control" type="number" min={0} onChange={((e) => handleChange("input", "normalBed", e.target.value))} value={hosBed.normalBed} />
                                </div>
                            </div>
                            </div>
                            :
                            ""
                        }
                    </div>
                </div>
                <br />
                <div class="col-md-4 offset-md-4">
                    {bedValid ? <div className="alert alert-warning">{bedValid}</div> : ""}
                </div>
            </div>
        </React.Fragment>
    )

}
export default UserHomePage