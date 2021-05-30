import React, { useState } from 'react';
import { useHistory } from 'react-router';
import "./docRoster.css"




function DoctorRoster() {
    const [tabChange, setTabChange] = useState("personal")
    const [proffesionalTabChange, setProffesionalTabChange] = useState("professional")
    const [personalCount, setPersonalCount] = useState(2)
    const [professionalCount, setProfessionalCount] = useState(2)
    const [doctorData, setDoctorData] = useState({
        firstName: null,
        lastName: null,
        fullName: null,
        dateOfBirth: null,
        email: null,
        phoneNumber: null,
        bloodGroup: null,
        graduationCollege: null,
        graduationPercentage: null,
        masterCollege: null,
        masterPercentage: null,
        totalExperience: null,
        departName: null,
        specilzation: null,
        docDescription: null,
        researchDescription: null
    })

    const handleTabChange = (tab) => {
        if (tab == "personal") {
            setPersonalCount(personalCount + 1)
            setTabChange("personal")
        }

        if (tab == "professional") {
            setProfessionalCount(professionalCount + 1)
            setProffesionalTabChange("professional")
        }
    }


    const handelChange = (inputType, stateName, value) => {
        if (inputType == "input") {
            setDoctorData((prev) => ({
                ...prev,
                [stateName]: value
            }))
        }
    }

    const submitData = (event) => {
        event.preventDefault();
        console.log(doctorData)
    }

    return (
        <React.Fragment>
            <div>
                <div className="docHeader"> Doctor Details </div> <br />
                <div className="docHeader" type="button" onClick={() => handleTabChange("personal")}>Personal Details</div>
                {tabChange == "personal" && personalCount % 2 == 0 ?
                    <div className="container-fluid">
                        <div className="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="firstName">First Name </label>
                                    <input type="text" class="form-control" value={doctorData.firstName} onChange={(e) => handelChange("input", "firstName", e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" class="form-control" value={doctorData.lastName} onChange={(e) => handelChange("input", "lastName", e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input type="text" class="form-control" value={doctorData.fullName} onChange={(e) => handelChange("input", "fullName", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="dateOfBirth">Date Of Birth </label>
                                    <input type="text" class="form-control" value={doctorData.dateOfBirth} onChange={(e) => handelChange("input", "dateOfBirth", e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" class="form-control" value={doctorData.email} onChange={(e) => handelChange("input", "email", e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input type="text" class="form-control" value={doctorData.phoneNumber} onChange={(e) => handelChange("input", "phoneNumber", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="bloodGroup">Blood Group</label>
                                    <input type="text" class="form-control" value={doctorData.bloodGroup} onChange={(e) => handelChange("input", "bloodGroup", e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="graduationCollege">Graduation College</label>
                                    <input type="text" class="form-control" value={doctorData.graduationCollege} onChange={(e) => handelChange("input", "graduationCollege", e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="graduationPercentage">Graduation Percentage </label>
                                    <input type="text" class="form-control" value={doctorData.graduationPercentage} onChange={(e) => handelChange("input", "graduationPercentage", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="masterCollege">Master's College</label>
                                    <input type="text" class="form-control" value={doctorData.masterCollege} onChange={(e) => handelChange("input", "masterCollege", e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="masterPercentage">Master's Percentage</label>
                                    <input type="text" class="form-control" value={doctorData.masterPercentage} onChange={(e) => handelChange("input", "masterPercentage", e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""}

                <div className="docHeader" type="button" onClick={() => handleTabChange("professional")}>Professional Details</div>
                {proffesionalTabChange == "professional" && professionalCount % 2 == 0 ?
                    <div className="container-fluid">
                        <div className="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="totalExperience">Total Experience </label>
                                    <input type="text" class="form-control" value={doctorData.totalExperience} onChange={(e) => handelChange("input", "totalExperience", e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="departName">Department Name</label>
                                    <input type="text" class="form-control" value={doctorData.departName} onChange={(e) => handelChange("input", "departName", e.target.value)} />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label htmlFor="specilzation">Specilzation</label>
                                    <input type="text" class="form-control" value={doctorData.specilzation} onChange={(e) => handelChange("input", "specilzation", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label htmlFor="docDescription">Doctor Description</label>
                                    <textarea type="text" class="form-control" value={doctorData.docDescription} onChange={(e) => handelChange("input", "docDescription", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label htmlFor="researchDescription">Research Description</label>
                                    <textarea type="text" class="form-control" value={doctorData.researchDescription} onChange={(e) => handelChange("input", "researchDescription", e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""}

                <div class="form-group">
                    <button type="submit" class="btn btn-primary" onClick={submitData}>Register</button>
                </div>
            </div>

        </React.Fragment>
    )
}

export default DoctorRoster
