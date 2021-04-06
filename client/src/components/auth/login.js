import React, {useState} from 'react'; 
import axios from 'axios';
import {connect} from 'react-redux';
import { useHistory } from "react-router";
import {loggedInUser} from '../../actions/action'


function LoginPage(props) {
    const [loginData,setLoginData]=useState({
        email:"",
        password:""
    })

    const handleChange=(type,state,value)=>{
        if(type=="input"){
            setLoginData((prev)=>({
                ...prev,
                [state]:value    
            }))
        }
    }

    const history = useHistory();
    const submitData=  (event)=>{
        event.preventDefault();
        let body=JSON.stringify(loginData)
        const url='http://localhost:5000/login'
        const headers = {
            'Content-Type': 'application/json',
          }
        axios.post(url,body ,{ headers: headers})
        .then(res=> {
            let userData= res.data
            props.dispatch(loggedInUser(userData))
            history.replace('/userHomePage')
        })
        .catch(err=>console.log(err,"Error Occured while Posting Data"))   
    }


    return (
        <React.Fragment>
            <form>
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 offset-md-4">
                            <div class="form-group">
                                <label htmlFor="registerEmail">Email address</label>
                                <input type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp" onChange={((e)=>handleChange("input","email",e.target.value))}value={loginData.email}/>
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" class="form-control" id="password" onChange={((e)=>handleChange("input","password",e.target.value))} value={loginData.password}/>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary" onClick={submitData}>Sign in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
   return state
  }
 
export default connect(mapStateToProps)(LoginPage)