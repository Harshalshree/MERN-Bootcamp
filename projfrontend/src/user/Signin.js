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
                setValues({...values, error: data.error, loading: false,})
            }else{
                authenticate(data, ()=>{
                    setValues(({...values, didRedirect: true}))
                })
            }
        })
        .catch(console.log("Signin request failed"))
        
    }

    const performRedirect = () => {
        //TODO: Perform redirect here
        if(didRedirect){
            if(user && user.role == 1){
                return(
                    <p>Redirect to admin dashboard</p>
                )
            }else{
                return(
                    <p>Redirect to user dashboard</p>
                )
            }
        }
        if(isAutheniticated()){
            return <Redirect to="/"/>
        }
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

    const loadingMessage = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-info" style={{display: loading ? "" : "none"}}>
                        <h2>Loading...</h2>
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
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;