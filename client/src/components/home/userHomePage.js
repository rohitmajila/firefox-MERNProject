import React, {useState} from 'react'; 
import {connect} from 'react-redux';



function UserHomePage(props) {

    console.log("home page",props)
    return (
        <React.Fragment>
     <h1>Welcome {props?props.userName?
                 props.userName.loggedUser?
                 props.userName.loggedUser.userData?
                 props.userName.loggedUser.userData.user?
                 props.userName.loggedUser.userData.user.name?
                 props.userName.loggedUser.userData.user.name:
                 "":"":"":"":"":""}</h1>

        </React.Fragment>
    )

}

   const mapStateToProps = state => ({
    userName:state
   })


export default connect(mapStateToProps)(UserHomePage)