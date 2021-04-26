import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signOut, isAuthenticated} from '../auth/helper/index'

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: "#2ecc72"};
    } else {
        return {color: "#ffffff"}
    }
}

function Navbar({history}){
    return(
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">Cart</Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role == 0 && (
                    <li className="nav-item">
                    <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">U.Dashboard</Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role == 1 && (
                    <li className="nav-item">
                    <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">A.Dashboard</Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <li className="nav-item">
                    <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">Signup</Link>
                </li>
                )}
                {!isAuthenticated() && (
                    <li className="nav-item">
                    <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">Signin</Link>
                </li>
                )}
                
                {isAuthenticated() && (
                    <li className="nav-item">
                    <span className="nav-link text-warning" 
                    onClick={()=>{
                        signOut(()=>{
                            history.push("/")
                        })
                    }}>
                        Signout
                    </span>
                </li>
                )}
                
            </ul>
        </div>
    )
}

export default withRouter(Navbar)