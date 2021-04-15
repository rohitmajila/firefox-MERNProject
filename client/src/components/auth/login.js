import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Redirect } from "react-router";
import { login } from '../../actions/action'
import { useDispatch, useSelector } from "react-redux";


function LoginPage() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedUser.isLoggedIn)
    const history = useHistory();
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
                if (res.data.token) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                }
                let userData = res.data
                dispatch(login(userData))
                history.replace('/userHomePage')
            })
            .catch(err => console.log(err, "Error Occured while Posting Data"))
    }

    if (loggedIn) {
        return <Redirect to="/userHomePage" />
    }

    return (
        <React.Fragment>
            <form>
                <div classNameName="container">
                    <div className="row">
                        <div className="col-md-5 offset-md-4">
                            <div className="form-group">
                                <label htmlFor="registerEmail">Email address</label>
                                <input type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" onChange={((e) => handleChange("input", "email", e.target.value))} value={loginData.email} />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" onChange={((e) => handleChange("input", "password", e.target.value))} value={loginData.password} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" onClick={submitData}>Sign in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </React.Fragment>
    )
}

export default LoginPage;