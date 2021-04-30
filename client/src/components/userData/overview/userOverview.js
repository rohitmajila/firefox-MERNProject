import React, { useState } from 'react';
import axios from 'axios';
import EditUserOverview from './editUserOverview';
import { userOverviewData } from '../../../actions/action'
import { useDispatch, useSelector } from "react-redux";
import { X, Pencil } from 'react-bootstrap-icons';
import '../overview/userOverview.css'


function UserOverview() {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [userData, setUserData] = useState({
        discipline: "",
        introduction: "",
        language: "",
        skills: ""
    })

    const userEmail = useSelector(state => state.loggedUser.user.user.email)

    const modalChange = (state) => {
        setModal(state)
    }

    React.useEffect(() => {
        getData()
    }, [])


    const getData = () => {
        const url = `http://localhost:5000/userOverviewGet/${userEmail}`
        axios.get(url)
            .then(response => {
                setUserData({
                    introduction: response.data.userData.introduction,
                    language: response.data.userData.language,
                    discipline: response.data.userData.discipline,
                    skills: response.data.userData.skills
                })
                let data = response.data.userData
                dispatch(userOverviewData(data))

            })
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-5">
                    <div className="header">
                        About Me
                        <span className="editHeader">
                            <Pencil color="white" onClick={() => modalChange(true)} size={18} />
                        </span>
                    </div>
                    <div>
                        <h4>Introduction</h4>
                        <p>{userData.introduction}</p>
                    </div>
                    <div>
                        <h4>Langauges</h4>
                        <p>{userData.language}</p>
                    </div>
                    <div>
                        <h4>Disciplines</h4>
                        <p>{userData.discipline}</p>
                    </div>
                    <div>
                        <h4>Skills and expertise</h4>
                        <p>{userData.skills}</p>
                    </div>
                </div>

            </div>
            {modal ?
                <div className="overlay">
                    <div class="modalStyle">
                        <div class="modal-content">
                            <div className="header">
                                Edit Overview
                            <span className="editHeader">
                                    <X color="white" onClick={() => modalChange(false)} size={30} />
                                </span>
                            </div>
                            <div >
                                <EditUserOverview modal={modalChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                : ""}
        </React.Fragment>
    )

}

export default UserOverview
