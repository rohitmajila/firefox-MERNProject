import React, {useState} from 'react';
import axios from 'axios'


function RegisterPage() {
    const [registerData,setRegisterData]=useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange=(type,state,value)=>{
        if(type=="input"){
            setRegisterData((prev)=>({
                ...prev,
                [state]:value    
            }))
        }
    }

    const submitData=(event)=>{
        event.preventDefault();
        let body=JSON.stringify(registerData)
        const url='http://localhost:5000/register'
        const headers = {
            'Content-Type': 'application/json',
          }
        axios.post(url,body ,{ headers: headers})
        .then(res=>console.log(res, "Data Post Sucessfully"))
        .catch(err=>console.log(err,"Error Occured while Posting Data"))
        console.log(body)
    }

    return (
        <React.Fragment>
            <form>
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 offset-md-4">
                            <div class="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" class="form-control" id="name" onChange={((e)=>handleChange("input","name",e.target.value))} value={registerData.name}/>
                            </div>
                            <div class="form-group">
                                <label htmlFor="registerEmail">Email address</label>
                                <input type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp" onChange={((e)=>handleChange("input","email",e.target.value))}value={registerData.email}/>
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" class="form-control" id="password" onChange={((e)=>handleChange("input","password",e.target.value))} value={registerData.password}/>
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

export default RegisterPage