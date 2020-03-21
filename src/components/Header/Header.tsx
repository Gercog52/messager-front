import React from 'react'
import {Link} from 'react-router-dom'
import stylesM from './Header.module.css';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Button } from '@material-ui/core';

interface Iprops {
  userName?: string
  logOutUser: () => void
}
const useStyles = makeStyles({
  btn: {
    color: '#fff',
    textDecoration: 'none'
  }
});

export default function Header(props: Iprops) {
  let styles = useStyles();
    return (
      <AppBar color="primary" className={stylesM.header} position={'static'}>
        <div>
          React Chat
        </div>
        <div className={stylesM.blockInfo}>
          <div className={stylesM.blockInfo__userName}>
            {props.userName}
          </div>
          <Link to='/login' className={styles.btn} onClick={props.logOutUser}> 
            <Button color="inherit" >
              Log out
            </Button>
          </Link>
        </div>
      </AppBar>
        
    )
}
