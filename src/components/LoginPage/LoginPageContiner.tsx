import React from 'react'
import LoginPage from './LoginPage'
import { Switch, Route } from 'react-router-dom'
import RegistrationPage from './RegistrationPage'

export default function LoginPageContiner() {
    debugger
    return (
        <div>
            <Switch>
                <Route path="/login/registration" component={RegistrationPage} />
                <Route path="/login" component={LoginPage} />
            </Switch>
        </div>
    )
}
