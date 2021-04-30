import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UserOverview from '../overview/userOverview';
import UserResearch from '../research/userResearch';
import Experience from '../experience/experience';




function UserProfile() {
    const [toggle, setToggle] = useState(1)

    const currentUser = useSelector(state => state.loggedUser.user.user.name)


    const changeToogle = (index) => {
        setToggle(index)
    }

    return (
        <React.Fragment>
            <h3>{currentUser}</h3>
            <div>
                <ul class="nav nav-tabs" >
                    <li class="nav-item">
                        <button className={toggle == 1 ? "nav-link active" : "nav-link"} onClick={() => changeToogle(1)} type="button" >Overview</button>
                    </li>
                    <li class="nav-item">
                        <button className={toggle == 2 ? "nav-link active" : "nav-link"} onClick={() => changeToogle(2)} type="button" >Research</button>
                    </li>
                    <li class="nav-item">
                        <button className={toggle == 3 ? "nav-link active" : "nav-link"} onClick={() => changeToogle(3)} type="button">Experience</button>
                    </li>
                </ul>
                <div class="tab-content">
                    <div className={toggle == 1 ? "tab-pane fade show active" : "tab-pane fade"} onClick={() => changeToogle(1)} ><UserOverview /></div>
                    <div className={toggle == 2 ? "tab-pane fade show active" : "tab-pane fade"} onClick={() => changeToogle(2)} ><UserResearch /></div>
                    <div className={toggle == 3 ? "tab-pane fade show active" : "tab-pane fade"} onClick={() => changeToogle(3)} ><Experience /></div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default UserProfile
