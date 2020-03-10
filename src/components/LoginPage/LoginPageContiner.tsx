import React from 'react'
import LoginPage from './LoginPage'
import { Switch, Route } from 'react-router-dom'
import RegistrationPage from './RegistrationPage'
import { connect } from 'react-redux'
import {loginThunk,registrationThunk} from '../../redux/authReducer';
import { IregistrationData, IloginData } from '../../api/apiType'

interface Iprops {
  registrationThunk: (data: IregistrationData) => Promise<void>
  loginThunk: (data: IloginData) => Promise<void>
}

function LoginPageContiner(props: Iprops) {
    return (
        <div>
            <Switch>
                <Route path="/login/registration" render={() => <RegistrationPage submitFunc={props.registrationThunk}/>}/>
                <Route path="/login" render={() => <LoginPage submitFunc={props.loginThunk}/>} />
            </Switch>
        </div>
    )
}

export default connect(null,{
  registrationThunk,
  loginThunk,
})(LoginPageContiner);