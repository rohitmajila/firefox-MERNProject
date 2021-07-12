import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'



function UserRegister() {
    const history = useHistory();
    const [successful, setSuccessful] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null)
    const [userRegisterData, setUserRegisterData] = useState({
        userName: null,
        userEmail: null,
        userPhoneNo: null,
        userPassword: null,
    })

    const handleChange = (type, state, value) => {
        if (type == "input") {
            setUserRegisterData((prev) => ({
                ...prev,
                [state]: value
            }))
        }
    }

    const submitData = (event) => {
        event.preventDefault();
        let body = JSON.stringify(userRegisterData)
        console.log(body)
        const url = 'http://localhost:5000/userRegister'
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
        history.push('/userLogin')
    }

    return (
        <React.Fragment>
            <form>
                <div class="container register">
                    <div class="row">

                        <div class="col-md-4 register-left">
                            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                            <h3>Welcome</h3>
                            <p>Already have an User Account?</p>
                            <a className="text-light" href="/userLogin">Login</a>
                        </div>

                        <div class="col-md-8 rgisterDown register-right">
                            <h3 class="register-heading">Register as a User</h3>
                            <div class="row register-form">

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label htmlFor="userName" >Name *</label>
                                        <input type="text" className="form-control" id="userName" onChange={((e) => handleChange("input", "userName", e.target.value))} value={userRegisterData.userName} />
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="userEmail" >Email *</label>
                                        <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" onChange={((e) => handleChange("input", "userEmail", e.target.value))} value={userRegisterData.userEmail} />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label htmlFor="userPhoneNo" >Phone Number *</label>
                                        <input type="Number" min={0} className="form-control" id="userPhoneNo" onChange={((e) => handleChange("input", "userPhoneNo", e.target.value))} value={userRegisterData.userPhoneNo} />
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="userPassword" >Password *</label>
                                        <input type="password" class="form-control" id="userPassword" onChange={((e) => handleChange("input", "userPassword", e.target.value))} value={userRegisterData.userPassword} />
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

export default UserRegister