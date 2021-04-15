import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux"; 


function UserHomePage() {

    const currentUser=useSelector(state=>state.loggedUser.isLoggedIn)
    const userName=useSelector(state=>state.loggedUser.user.user.name)
    console.log(userName)
    
    return (
        <React.Fragment>
     <h1>Welcome {userName}</h1>

        </React.Fragment>
    )

}
export default UserHomePage