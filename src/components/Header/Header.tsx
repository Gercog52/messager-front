import React from 'react'
import {Link} from 'react-router-dom'
import stylesM from './Header.module.css';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Button } from '@material-ui/core';

interface Iprops {
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
      <AppBar color="primary" className={''}>
        <div className={stylesM.header}>
            <div>
                React Chat
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
