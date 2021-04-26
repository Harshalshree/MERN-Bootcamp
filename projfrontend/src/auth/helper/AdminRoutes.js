import React from 'react'
import {Router, Redirect} from 'react-router-dom'
import {isAuthenticated} from './index'

const AdminRoute = ({ component: Component, ...rest }) => {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated && isAuthenticated.user.role === 1 ? (
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  
  export default AdminRoute;