import React, {useState} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import {signUp} from '../auth/helper/index'



const Signup = ()=>{

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const {name, email, password, error, success} = values

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setvalues({...values, error: false})
        signUp({name, email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }else{
                setValues({...values, name: "", email: "", password: "", error: "", success: true})
            }
        })
        .catch(console.log("Error in signup"))
    }

    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" onChange={handleChange("name")} type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">E-Mail</label>
                            <input className="form-control" onChange={handleChange("email")} type="email"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" onChange={handleChange("password")} type="password"/>
                        </div>
                        <button className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Base title="Signup Page" description="A page for user to signup!"> 
        {signUpForm()}
        </Base>
    )
}

export default Signup;