import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import UserDashboard from './user/UserDashBoard'
import AdminDashboard from './user/AdminDashBoard'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'


export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signup" exact component={Signup}></Route>
            <Route path="/signin" exact component={Signin}></Route>
            <PrivateRoute path="/user/dashboard" exact component={UserDashboard}></PrivateRoute>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}></AdminRoute>
            <AdminRoute path="/admin/create/category" exact component={AddCategory}></AdminRoute>
            <AdminRoute path="/admin/categories" exact component={ManageCategories}></AdminRoute>
            <AdminRoute path="/admin/create/product" exact component={AddProduct}></AdminRoute>
        </Switch>
        </BrowserRouter>
    )
}