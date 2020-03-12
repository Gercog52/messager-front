import React from 'react';
import {Provider, connect} from 'react-redux';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {logOutUser} from './redux/authReducer';
import store, { IRootState } from './redux/store';
import Header from './components/Header/Header';
import Content from './components/content/Content';
import LoginPageContiner from './components/LoginPage/LoginPageContiner';
import './App.css'

interface Iprops {
  isAuth: boolean
  logOutUser: () => void
}

function App(props: Iprops) {
  if(!props.isAuth) {
    return <Redirect to="/login"/>
  }
  return (
    <div className="">
      <Header logOutUser={props.logOutUser}/>
      <Content/>
    </div>
  )
}
const AppContiner = connect((state: IRootState) => {
  return {
    isAuth: state.authData.isAuth
  }
}, {
  logOutUser
})(App);

function AppSwith() {
  return (
    <Switch>
      <Route path='/login' component={LoginPageContiner}/>
      <Route path='/' component={AppContiner}/>
    </Switch>
  );
}



function AppWrap() {
  return <>
    <HashRouter>
      <Provider store={store}>
        <AppSwith/>
      </Provider>
    </HashRouter>
  </>
}
export default AppWrap;
