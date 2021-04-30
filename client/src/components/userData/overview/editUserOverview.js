import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import '../overview/userOverview.css'


function EditUserOverview(props) {
    const userData = useSelector(state => state)

    const userEmail = useSelector(state => state.loggedUser.user.user.email)

    const [userOverview, setUserOverview] = useState({
        introduction: userData?.userData?.userData?.introduction,
        language: userData?.userData?.userData?.language,
        discipline: userData?.userData?.userData?.discipline,
        skills: userData?.userData?.userData?.skills,
        email: userEmail
    })

    const handleChange = (type, state, value) => {
        if (type == "textarea") {
            setUserOverview((prev) => ({
                ...prev,
                [state]: value
            }))
        }

        if (type == "select") {
            setUserOverview((prev) => ({
                ...prev,
                [state]: value
            }))
        }

        if (type == "input") {
            setUserOverview((prev) => ({
                ...prev,
                [state]: value
            }))
        }
    }

    const SumbitData = () => {
        const url = `http://localhost:5000/userOverviewPost/${userEmail}`
        const headers = {
            'Content-Type': 'application/json'
        }
        const body = JSON.stringify(userOverview)
        axios.post(url, body, { headers: headers })
            .then(response => {
                if(response.status==200){
                    console.log(response)
                    props.modal(false)
                }
                
            })
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label >Update Introduction:</label>
                            <textarea className="form-control" value={userOverview.introduction} onChange={(e) => handleChange("textarea", "introduction", e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label >Update Languages:</label>
                            <select className="form-control" value={userOverview.language} onChange={(e) => handleChange("select", "language", e.target.value)} name="language" id="language" >
                                <option value=""></option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Bangali">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Update disciplines:</label>
                            <input className="form-control" value={userOverview.discipline} onChange={(e) => handleChange("input", "discipline", e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label >Update Skills:</label>
                            <input className="form-control" value={userOverview.skills} onChange={(e) => handleChange("input", "skills", e.target.value)} />
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary" onClick={SumbitData}>Save</button>&nbsp;&nbsp;
                            <button type="submit" class="btn btn-primary" onClick={()=>props.modal(false)} >Cancel</button>
                        </div>
                       
                    </div>

                </div>

            </div>


        </React.Fragment>
    )

}

export default EditUserOverview
