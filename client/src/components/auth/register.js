import React, { useState } from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios'



function RegisterPage() {
    const [successful, setSuccessful] = useState(null);
    const [errorMsg, setErrorMsg]=useState(null);
    const [registerData, setRegisterData] = useState({
        name: null,
        email: null,
        phoneNo:null,
        password: null,
        hosState:null,
        hosDistrict:null,
        hosPinCode:null,
    })

    const handleChange = (type, state, value) => {
        if (type == "input") {
            setRegisterData((prev) => ({
                ...prev,
                [state]: value
            }))
        }
    }

    const submitData = (event) => {
        event.preventDefault();
        let body = JSON.stringify(registerData)
        console.log(body)
        const url = 'http://localhost:5000/register'
        const headers = {
            'Content-Type': 'application/json',
        }
        axios.post(url, body, { headers: headers }).then(response => {
            console.log(response)
            if (response.data.status == 200) {
                setSuccessful(true);  
            }
            
            else {
                setSuccessful(false)
                setErrorMsg(response.data.message)
            }
           
        } )
    }

    if (successful) {
        return <Redirect to="/login" />
    }

    return (
        <React.Fragment>
            <form>
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 offset-md-4">
                            <div class="form-group">
                                <label htmlFor="name" className="text-light">Hospital Name *</label>
                                <input type="text" className="form-control" id="name" onChange={((e) => handleChange("input", "name", e.target.value))} value={registerData.name} />
                            </div>
                            <div class="form-group">
                                <label htmlFor="userName" className="text-light">Hospital State *</label>
                                <input type="text" className="form-control" onChange={((e) => handleChange("input", "hosState", e.target.value))} value={registerData.hosState} />
                            </div>

                            <div class="form-group">
                                <label htmlFor="userName" className="text-light">Hospital District *</label>
                                <input type="text" className="form-control" onChange={((e) => handleChange("input", "hosDistrict", e.target.value))} value={registerData.hosDistrict} />
                            </div>

                            <div class="form-group">
                                <label htmlFor="userName" className="text-light">Pin Code *</label>
                                <input type="number" min={0} className="form-control" onChange={((e) => handleChange("input", "hosPinCode", e.target.value))} value={registerData.hosPinCode} />
                            </div>
                            <div class="form-group">
                                <label htmlFor="registerEmail" className="text-light">Email address *</label>
                                <input type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" onChange={((e) => handleChange("input", "email", e.target.value))} value={registerData.email} />
                                <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label htmlFor="phoneNo" className="text-light">Phone Number *</label>
                                <input type="Number" min={0} className="form-control" id="phoneNo" aria-describedby="emailHelp" onChange={((e) => handleChange("input", "phoneNo", e.target.value))} value={registerData.phoneNo} />
                            </div>
                            <div class="form-group">
                                <label htmlFor="password" className="text-light">Password *</label>
                                <input type="password" class="form-control" id="password" onChange={((e) => handleChange("input", "password", e.target.value))} value={registerData.password} />
                            </div>
                            <div class="form-group">
                                <button type="submit" className="btn btn-primary" onClick={submitData}>Sign in</button> <a className="text-light" href="/login">Already a Member</a>
                            </div>
                           {successful==false?<div className="alert alert-warning">{errorMsg}</div>:""}
                        </div>
                    </div>
                </div>
            </form>

        </React.Fragment>
    )
}

export default RegisterPage