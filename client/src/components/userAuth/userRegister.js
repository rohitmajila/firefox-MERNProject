import React, { useState } from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios'



function UserRegister() {
    const [successful, setSuccessful] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null)
    const [userRegisterData, setUserRegisterData] = useState({
        userName: null,
        userEmail: null,
        userPhoneNo:null,
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
           
        } )
    }

    if (successful) {
        return <Redirect to="/userLogin" />
    }

    return (
        <React.Fragment>
            <form>
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 offset-md-4">
                            <div class="form-group">
                                <label htmlFor="userName" className="text-light">Name *</label>
                                <input type="text" className="form-control" id="userName" onChange={((e) => handleChange("input", "userName", e.target.value))} value={userRegisterData.userName} />
                            </div>
                            <div class="form-group">
                                <label htmlFor="userEmail" className="text-light">Email *</label>
                                <input type="email"  className="form-control" id="userEmail" aria-describedby="emailHelp" onChange={((e) => handleChange("input", "userEmail", e.target.value))} value={userRegisterData.userEmail} />
                            </div>
                            <div class="form-group">
                                <label htmlFor="userPhoneNo" className="text-light">Phone Number *</label>
                                <input type="Number" min={0} className="form-control" id="userPhoneNo"  onChange={((e) => handleChange("input", "userPhoneNo", e.target.value))} value={userRegisterData.userPhoneNo} />
                            </div>
                            <div class="form-group">
                                <label htmlFor="userPassword" className="text-light">Password *</label>
                                <input type="password" class="form-control" id="userPassword" onChange={((e) => handleChange("input", "userPassword", e.target.value))} value={userRegisterData.userPassword} />
                            </div>
                            <div class="form-group">
                                <button type="submit" className="btn btn-primary" onClick={submitData}>Sign Up</button> <a className="text-light" href="/userLogin">Already a Member</a>
                            </div>
                           {successful==false?<div className="alert alert-warning"></div>:""}
                        </div>
                    </div>
                </div>
            </form>

        </React.Fragment>
    )
}

export default UserRegister