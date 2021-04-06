import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import RegisterPage from './components/auth/register';
import LoginPage from './components/auth/login';
import UserHomePage from './components/home/userHomePage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App(props){
  let authData=props?props.auth?props.auth.loggedUser?
  props.auth.loggedUser.userData?props.auth.loggedUser.userData.user?
  props.auth.loggedUser.userData.user.name?props.auth.loggedUser.userData.user.name:"":"":"":"":"":""
                 
  console.log(authData)
  return (
     <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">My Jobs</a>
          {authData?
          <a className="navbar-brand" href="/userHomePage">Home</a>
          :""}
          {authData?"":
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">Register</a>
              </li>
            </ul>
          </div>}
        </div>
      </nav>

      <Router>
        <Switch>
          
          <Route exact path="/userHomePage">
            <UserHomePage/>
          </Route>
          <Route exact path="/login">
            <LoginPage/>
          </Route>
          {/* <Route exact path="/forgetPassword">
            <ForgetPassword/>
          </Route> */}
          <Route exact path="/register">
            <RegisterPage/>
          </Route>
          {/* <Route exact path="/resetPassword">
            <ResetPassword/>
          </Route> */}
        </Switch>
      </Router>
      </React.Fragment>
    
  )

  }

  const mapStateToProps = (state) => ({
    auth:state
   })

export default connect(mapStateToProps, null)(App);
