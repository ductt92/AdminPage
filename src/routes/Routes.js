import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom'
import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";
import Dashboard from '../pages/dashboards/Default'
import SignIn from "../pages/auth/SignIn";
import axios from "axios";

const HomePage = () => {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  )
}

const LoginPage = () => {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  )
}
const ErorrPage = () => {
  return (
    <AuthLayout>
      <Page404 />
    </AuthLayout>
  )
}


const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log("1231321")
  return (
    <Route {...rest} render={(props) => (
      // checkAuthencation.isAuthenticated === true
      localStorage.getItem("token")
        ? <Component {...props} />
        : <Redirect to='/auth/sign-in' />
    )} />

  )
}



export default function AuthExample() {
  return (
    <Router>
      <Switch>
        <Route path="/auth/sign-in" component={LoginPage} />
        <PrivateRoute path='/' exact component={HomePage} />
        <PrivateRoute path='/dashboard' exact component={HomePage} />
        <Route path="*" component={ErorrPage} />
      </Switch>

    </Router>
  )
}