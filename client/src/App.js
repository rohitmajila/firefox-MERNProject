import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterPage from './components/auth/register';
import LoginPage from './components/auth/login';
import { logout } from './actions/action'
import UserHomePage from './components/home/userHomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";


function App() {
  const currentUser = useSelector(state => state.loggedUser.isLoggedIn)
  const dispatch = useDispatch();
  const Logout = () => {
    localStorage.removeItem("user")
    dispatch(logout())

  }
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">My Jobs</a>
          {!currentUser?
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li>
              </ul>
            </div>
          :""}

          {currentUser ?
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a className="nav-link" href="/userHomePage" >Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login" onClick={Logout}>Logout</a>
              </li>
            </ul>
            : ""}
        </div>
      </nav>

      <Router>
        <Switch>
          <Route exact path="/userHomePage">
            <UserHomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>

  )

}


export default App
