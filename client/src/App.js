import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RegisterPage from './components/auth/register';
import LoginPage from './components/auth/login';
import { ErrorBoundry } from './ErrorBoundry/erorrBoundry';
import { logout, userLogout } from './actions/action'
import UserHomePage from './components/home/userHomePage';
import HospitalBed from './components/hospitalData/hospitalBedData';
import UserDataPage from './components/home/userDataPage';
import DoctorRoster from './components/doctorRoster/doctorRoster';
import DoctorDataGrid from './components/doctorRoster/doctorDataGrid';
import UserLogin from './components/userAuth/userLogin';
import UserRegister from './components/userAuth/userRegister';
import SearchHospital from './components/userHome/userSerchHospital';
import BookAppointment from './components/userHome/bookAppointment';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BagPlusFill } from 'react-bootstrap-icons';
import { Grid } from 'react-bootstrap-icons';
import { PersonPlus } from 'react-bootstrap-icons';
import { Search } from 'react-bootstrap-icons';
import { House } from 'react-bootstrap-icons';


function App() {
  const user = useSelector(state => state.userLoggedUser.isLoggedIn)
  const currentUser = useSelector(state => state.loggedUser.isLoggedIn)
  const authRouteCurrent = useSelector(state => state.loggedUser.isLoggedIn)
  const authUser = useSelector(state => state.userLoggedUser.isLoggedIn)
  const dispatch = useDispatch();

  const Logout = () => {
    sessionStorage.removeItem("user")
    dispatch(logout())
  }

  const userLogout1 = () => {
    sessionStorage.removeItem("userLoginData")
    dispatch(userLogout())
  }


  return (
    <React.Fragment>

      {currentUser || user ?
        "" :
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/"><span title="Home"><House color="white" size={20} /></span></a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/userRegister">User SignIn/SignUp</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Hospital SignIn/SignUp</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      }

      {currentUser ?
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container-fluid">
            <div>
              <a className="navbar-brand" href="/doctorRoster"><span title="Doctor Addition"><PersonPlus color="white" size={20} /></span> </a>
              <a className="navbar-brand" href="/allDoctorData" ><span title="Doctor Data Grid"><Grid color="white" size={20} /></span></a>
              <a className="navbar-brand" href="/hospitalData" > <span title="Hospital Bed Data"><BagPlusFill color="white" size={20} /></span></a>
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login" onClick={Logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        : ""
      }

      {user ?
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/userSerchHospital"><span title="Search Hospital"><Search color="white" size={20} />&nbsp;&nbsp;Search Hospital</span></a>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/userLogin" onClick={userLogout1}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        : ""
      }


      <ErrorBoundry>

        <Router>
          <Switch>

            <Route exact path="/userLogin">
              <div className="backgroundImage">
                <UserLogin />
              </div>
            </Route>

            <Route exact path="/userRegister" >
              <div className="backgroundImage">
                <UserRegister />
              </div>
            </Route>

            <Route exact path="/login">
              <div className="backgroundImage">
                <LoginPage />
              </div>
            </Route>

            <Route exact path="/register" >
              <div className="backgroundImage">
                <RegisterPage />
              </div>
            </Route>

            <Route exact path="/">
              <div className="backgroundImage">
                <HospitalBed />
              </div>
            </Route>


            {authRouteCurrent || authUser ?
              <Route exact path="/userHomePage">
                <UserHomePage />
              </Route> :
              <Route exact path="*" render={() => <Redirect to="/login" />} />
            }

            {authRouteCurrent || authUser ?
              <Route exact path="/hospitalData">
                <UserDataPage />
              </Route> :
              <Route exact path="*" render={() => <Redirect to="/login" />} />
            }

            {authRouteCurrent || authUser ?
              <Route exact path="/doctorRoster">
                <DoctorRoster />
              </Route> :
              <Route exact path="*" render={() => <Redirect to="/login" />} />
            }

            {authRouteCurrent || authUser ?
              <Route exact path="/allDoctorData">
                <DoctorDataGrid />
              </Route> :
              <Route exact path="*" render={() => <Redirect to="/login" />} />
            }

            {authUser || authRouteCurrent ?
              <Route exact path="/userSerchHospital">
                <SearchHospital />
              </Route> :
              <Route exact path="*" render={() => <Redirect to="/userLogin" />} />
            }

            {authUser || authRouteCurrent ?
              <Route exact path="/bookDoctorAppointment">
                <BookAppointment />
              </Route>
              :
              <Route exact path="*" render={() => <Redirect to="/userLogin" />} />
            }

          </Switch>

        </Router>
      </ErrorBoundry>
    </React.Fragment>

  )

}


export default App
