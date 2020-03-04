import React from 'react'
import {Link} from 'react-router-dom'
import stylesM from './Header.module.css';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
  btn: {
    color: '#fff',
    textDecoration: 'none'
  }
});


export default function Header() {
  let styles = useStyles();
    return (
      <AppBar color="primary" className={''}>
        <div className={stylesM.header}>
            <div>
                React Chat
            </div>
            <Link to='/login' className={styles.btn}> 
              <Button color="inherit" >
                Log out
              </Button>
            </Link>
        </div>
      </AppBar>
        
    )
}
