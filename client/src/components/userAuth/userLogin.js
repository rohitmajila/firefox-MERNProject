import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router";
import { userLogin } from '../../actions/action';
import { useDispatch, useSelector } from "react-redux";





function UserLogin() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.userLoggedUser.isLoggedIn);
    const [validation, setvalidation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loginData, setLoginData] = useState({
        userEmail: "",
        userPassword: ""
    })

    const handleChange = (type, state, value) => {
        if (type == "input") {
            setLoginData((prev) => ({
                ...prev,
                [state]: value
            }))
        }
    }


    const submitData = (event) => {
        event.preventDefault();
        let body = JSON.stringify(loginData)
        const url = 'http://15.206.186.179:5000/userLogin'
        const headers = {
            'Content-Type': 'application/json',
        }
        axios.post(url, body, { headers: headers })
            .then(res => {
                if (res.data.token) {
                    sessionStorage.setItem('userLoginData', JSON.stringify(res.data))
                    setvalidation(true)
                    let userData = res.data
                    dispatch(userLogin(userData))
                }
                else {
                    setvalidation(false)
                    setErrorMsg(res.data.message)
                }
            })
            .catch(err => console.log(err, "Error Occured while Posting Data"))
    }

    if (loggedIn) {
        return <Redirect to="/userSerchHospital" />
    }

    return (
        <React.Fragment>
            <form>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 offset-md-4 columnStyle">
                            <div className="form-text text-light headerStyle">User Account Login</div>
                            <div class="card cardStyle">
                                <div className="form-group">
                                    <label htmlFor="userEmail"> User Email address *</label>
                                    <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" onChange={((e) => handleChange("input", "userEmail", e.target.value))} value={loginData.userEmail} />
                                    <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userPassword">Password *</label>
                                    <input type="password" className="form-control" id="userPassword" onChange={((e) => handleChange("input", "userPassword", e.target.value))} value={loginData.userPassword} />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" onClick={submitData}>Sign in</button>
                                </div>
                                {validation == false ? <div className="alert alert-warning">{errorMsg}</div> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </React.Fragment>
    )
}

export default UserLogin;