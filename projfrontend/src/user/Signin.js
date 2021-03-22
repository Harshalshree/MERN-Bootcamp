import React, { useState } from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { signIn, isAutheniticated, authenticate } from '../auth/helper/index'

const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false,
    })

    const { email, password, error, loading, didRedirect } = values
    const { user } = isAutheniticated()

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault() 
        setValues({...values, error: false, loading: true,})
        signIn({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: true,})
            }else{
                authenticate(data, ()=>{
                    setValues(({...values, didRedirect: true}))
                })
            }
        })
        .catch(console.log("Signin request failed"))
        
    }

    const errorMessage = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const successMessage = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                        New Account Created Successfully. Please {" "}
                        <Link to="/signin">Login Here.</Link>
                    </div>
                </div>
            </div>
            )
    }

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">E-Mail</label>
                            <input className="form-control" value={email} onChange={handleChange("email")} type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" value={password} onChange={handleChange("password")} type="password" />
                        </div>
                        <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Signin Page" description="A page for user to signin!">
            {signInForm()}
        </Base>
    )
}

export default Signin;