import React, {useState} from 'react';


function LoginPage() {
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

    const submitData=(event)=>{
        event.preventDefault();
        console.log(loginData)
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

export default LoginPage