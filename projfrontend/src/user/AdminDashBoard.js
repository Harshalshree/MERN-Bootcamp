import React from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'

const AdminDashboard = () => {
    const {user: {name, email, role}} = isAuthenticated()

    const adminLeftSide = () => {
        return(
            <div className="card"></div>
        )
    }

    const adminRightSide = () => {

    }

    return(
        <Base title="Welcome to Admin Page" 
        description="Manage all of your products here"
        >
        {adminLeftSide()}
        {adminRightSide()}
        </Base>
    )
}

export default AdminDashboard;