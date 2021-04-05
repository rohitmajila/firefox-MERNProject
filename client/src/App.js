import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import RegisterPage from './components/auth/register';
import LoginPage from './components/auth/login';
import 'bootstrap/dist/css/bootstrap.min.css';


function App(){
  return (

     <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">My Jobs</a>
          <button className="navbar-toggler" type="button" >
          </button>
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

      <Router>
        <Switch>
          <Route exact path="/">
            {/* <Home/> */}
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
export default App;
