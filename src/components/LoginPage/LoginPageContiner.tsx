import React from 'react'
import LoginPage from './LoginPage'
import { Switch, Route, Redirect } from 'react-router-dom'
import RegistrationPage from './RegistrationPage'
import { connect } from 'react-redux'
import {loginThunk,registrationThunk,loginAnonimusThunk} from '../../redux/authReducer';
import { IregistrationData, IloginData } from '../../api/apiType'
import { IRootState } from '../../redux/store'

interface Iprops {
  registrationThunk: (data: IregistrationData) => Promise<void>
  loginThunk: (data: IloginData) => Promise<void>
  loginAnonimusThunk: () => Promise<void>
  isAuth: boolean
}

function LoginPageContiner(props: Iprops) {
  if (props.isAuth) {
    return <Redirect to='/'/>
  }
    return (
        <div>
            <Switch>
                <Route path="/login/registration" render={() => <RegistrationPage submitFunc={props.registrationThunk}/>}/>
                <Route path="/login" render={() => <LoginPage submitFunc={props.loginThunk} 
                                                              loginAnonimus={props.loginAnonimusThunk}
                                                   />}/>
            </Switch>
        </div>
    )
}

export default connect((state: IRootState) => {
  return {
    isAuth: state.authData.isAuth
  }
},{
  registrationThunk,
  loginThunk,
  loginAnonimusThunk
})(LoginPageContiner);