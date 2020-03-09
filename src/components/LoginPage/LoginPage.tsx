import React from 'react'
import { Link } from 'react-router-dom'
import { TextField, makeStyles, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';

let useStyles = makeStyles({
  centerBlock: {
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '0 auto',
    paddingTop: 20,
    paddingRight: 15,
    paddingLeft: 15,
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
  },
  loginBtn: {
    marginTop: 20,
  },
  linkBtn: {
    margin: '0 auto',
    textDecoration: 'none'
  }
})

export default function LoginPage() {
    const styles = useStyles();

    const formik = useFormik({
      initialValues: {
        password: '',
        login: '',
      },
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={styles.centerBlock}>
            <div className={styles.infoBlock}>
              <div className={styles.infoBlock__circle}>
                <LockOutlinedIcon/>
              </div>
              Login
            </div>
            <div className={styles.inputField}>
              <TextField label="login" 
                         variant="outlined"
                         name="login"
                         value={formik.values.login}
                         onChange={formik.handleChange}
                         fullWidth />
            </div>
            <div className={styles.inputField}>
              <TextField 
                         type="password"
                         label="password"
                         variant="outlined"
                         name="password"
                         value={formik.values.password}
                         onChange={formik.handleChange}
                         fullWidth
              />
            </div>
            <Button className={styles.loginBtn}
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    fullWidth
            >
              log in
            </Button>
            <Link className={styles.linkBtn} to={'/login/registration'}>
              <Button color="primary">
                registration
              </Button>
            </Link>
        </form>
    )
}
