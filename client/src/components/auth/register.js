import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'



function RegisterPage() {
    const history = useHistory();
    const [successful, setSuccessful] = useState(null);
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
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
        const url = 'http://localhost:5000/register'
        const headers = {
            'Content-Type': 'application/json',
        }
        axios.post(url, body, { headers: headers }).then(response => {
            if (response.data.status == 200) {
                setSuccessful(true);
                history.replace('/login')
            }
            else {
                setSuccessful(false)
            }
        })
    }

    return (
        <React.Fragment>
            <form>
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 offset-md-4">
                            <div class="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" class="form-control" id="name" onChange={((e) => handleChange("input", "name", e.target.value))} value={registerData.name} />
                            </div>
                            <div class="form-group">
                                <label htmlFor="registerEmail">Email address</label>
                                <input type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp" onChange={((e) => handleChange("input", "email", e.target.value))} value={registerData.email} />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" class="form-control" id="password" onChange={((e) => handleChange("input", "password", e.target.value))} value={registerData.password} />
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary" onClick={submitData}>Sign in</button>
                                {/* {successful ?
                                    <div class="alert alert-success" role="alert">
                                        USer Added Sucessfully
                                    <button type="button" class="alert-dismissible" aria-label="Close"></button>
                                    </div>
                                    :
                                    <div class="alert alert-danger" role="alert">
                                        {errorMsg}
                                    </div>} */}
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </React.Fragment>
    )
}

export default RegisterPage