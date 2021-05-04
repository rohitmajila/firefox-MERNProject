import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterPage from './components/auth/register';
import LoginPage from './components/auth/login';
import { ErrorBoundry } from './ErrorBoundry/erorrBoundry';
import { logout } from './actions/action'
import UserHomePage from './components/home/userHomePage';
import HospitalBed from './components/hospitalData/hospitalBedData';
import UserDataPage from './components/home/userDataPage';
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
      {!currentUser ?
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">FireFox</a>
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
          </div>
        </nav>
        :
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
           <a className="navbar-brand" href="/userHomePage">COVID-19 Hospital</a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/hospitalData" >Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login" onClick={Logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      }

      <ErrorBoundry>
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
            <Route exact path="/">
              <HospitalBed />
            </Route>
            <Route exact path="/hospitalData">
              <UserDataPage />
            </Route>
          </Switch>
        </Router>
      </ErrorBoundry>
    </React.Fragment>

  )

}


export default App
