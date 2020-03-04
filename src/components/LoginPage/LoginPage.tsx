import React from 'react'
import { Link } from 'react-router-dom'
import { TextField, makeStyles } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

let useStyles = makeStyles({
  centerBlock: {
    maxWidth: 400,
    width: '100%',
    margin: '0 auto',
    paddingTop: 20,
  },
  inputField: {
    marginTop: 15
  },
  infoBlock: {
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  infoBlock__circle: {
    background: '#dc004e',
    borderRadius: '50%',
    width: 50,
    height: 50,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginBottom: 10,
  }
})

export default function LoginPage() {
    let styles = useStyles();
    return (
        <div className={styles.centerBlock}>
            <div className={styles.infoBlock}>
              <div className={styles.infoBlock__circle}>
                <LockOutlinedIcon/>
              </div>
              Login
            </div>
            <div className={styles.inputField}>
              <TextField label="login" variant="outlined" fullWidth />
            </div>
            <div className={styles.inputField}>
              <TextField label="password" variant="outlined" fullWidth/>
            </div>
            <Link to={'/login/registration'}> reg </Link>
        </div>
    )
}
