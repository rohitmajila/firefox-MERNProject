import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios'
import './auth.css'



function RegisterPage() {
    const [successful, setSuccessful] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [registerData, setRegisterData] = useState({
        name: null,
        email: null,
        phoneNo: null,
        password: null,
        hosState: null,
        hosDistrict: null,
        hosPinCode: null,
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
        const url = 'http://15.206.186.179:5000/register'
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

        })
    }

    if (successful) {
        return <Redirect to="/login" />
    }

    return (
        <React.Fragment>
            <form>
                <div class="container register">
                    <div class="row">
                        <div class="col-md-4 register-left">
                            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                            <h3>Welcome</h3>
                            <p>Already have an Hospital Account?</p>
                            <a className="text-light" href="/login">Login</a>
                        </div>
                        <div class="col-md-8 register-right">
                            <h3 class="register-heading">Register as a Hospital</h3>
                            <div class="row register-form">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label htmlFor="name" >Hospital Name *</label>
                                        <input type="text" className="form-control" id="name" onChange={((e) => handleChange("input", "name", e.target.value))} value={registerData.name} />
                                    </div>

                                    <div class="form-group">
                                        <label htmlFor="userName" >Hospital State *</label>
                                        <input type="text" className="form-control" onChange={((e) => handleChange("input", "hosState", e.target.value))} value={registerData.hosState} />
                                    </div>

                                    <div class="form-group">
                                        <label htmlFor="userName" >Hospital District *</label>
                                        <input type="text" className="form-control" onChange={((e) => handleChange("input", "hosDistrict", e.target.value))} value={registerData.hosDistrict} />
                                    </div>

                                    <div class="form-group">
                                        <label htmlFor="userName" >Pin Code *</label>
                                        <input type="number" min={0} className="form-control" onChange={((e) => handleChange("input", "hosPinCode", e.target.value))} value={registerData.hosPinCode} />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label htmlFor="registerEmail">Email address *</label>
                                        <input type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" onChange={((e) => handleChange("input", "email", e.target.value))} value={registerData.email} />
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="phoneNo" >Phone Number *</label>
                                        <input type="Number" min={0} className="form-control" id="phoneNo" aria-describedby="emailHelp" onChange={((e) => handleChange("input", "phoneNo", e.target.value))} value={registerData.phoneNo} />
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="password" >Password *</label>
                                        <input type="password" class="form-control" id="password" onChange={((e) => handleChange("input", "password", e.target.value))} value={registerData.password} />
                                    </div>

                                </div>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btnRegister" onClick={submitData}>Sign Up</button>
                                {successful == false ? <div className="alert alert-warning messageStyle">{errorMsg}</div> : ""}
                            </div>
                        </div>
                    </div>
                </div>

            </form>

        </React.Fragment>
    )
}

export default RegisterPage