import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router";
import { login } from '../../actions/action'
import { useDispatch, useSelector } from "react-redux";




function LoginPage() {
    const dispatch = useDispatch();
    const [validation, setvalidation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const loggedIn = useSelector(state => state.loggedUser.isLoggedIn)
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
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
        const url = 'http://localhost:5000/login'
        const headers = {
            'Content-Type': 'application/json',
        }
        axios.post(url, body, { headers: headers })
            .then(res => {
                console.log(res)
                if (res.data.token) {
                    sessionStorage.setItem('user', JSON.stringify(res.data))
                    setvalidation(true)
                    let userData = res.data
                    dispatch(login(userData))
                }
                else {
                    setvalidation(false)
                    setErrorMsg(res.data.message)
                }
            })
            .catch(err => console.log(err, "Error Occured while Posting Data"))
    }

    if (loggedIn) {
        return <Redirect to="/userHomePage" />
    }

    return (
        <React.Fragment>
            <form>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 offset-md-4">
                            <div className="form-group">
                                <label htmlFor="registerEmail" className="text-light">Email address *</label>
                                <input type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" onChange={((e) => handleChange("input", "email", e.target.value))} value={loginData.email} />
                                <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-light">Password *</label>
                                <input type="password" className="form-control" id="password" onChange={((e) => handleChange("input", "password", e.target.value))} value={loginData.password} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" onClick={submitData}>Sign in</button>
                            </div>
                            {validation == false ? <div className="alert alert-warning">{errorMsg}</div> : ""}
                        </div>
                    </div>
                </div>
            </form>

        </React.Fragment>
    )
}

export default LoginPage;