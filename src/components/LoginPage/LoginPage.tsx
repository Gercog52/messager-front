import React from 'react'
import { Link } from 'react-router-dom'
import { TextField, makeStyles, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import { IloginData } from '../../api/apiType';

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
interface IfieldsForm {
  password: string
  login: string
}
interface IerrorsFrom {
  password?: string
  login?: string
}

function validateForm (values: IfieldsForm): IerrorsFrom {
  let errors: IerrorsFrom = {}
  if (!values.login.length) {
    errors.login = 'required field'
  }
  if (!values.password.length) {
    errors.password = 'required field'
  }
  return errors
}
interface Iprops {
  submitFunc: (data:IloginData) => Promise<void>
}

export default function LoginPage(props:Iprops) {
    const styles = useStyles();
    const formik = useFormik({
      validate: validateForm,
      initialValues: {
        password: '',
        login: '',
      },
      onSubmit: values => {
        props.submitFunc(values)
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
                         onBlur={formik.handleBlur}
                         error={(formik.errors.login && formik.touched.login) ? true : false}
                         helperText={(formik.errors.login && formik.touched.login) ? formik.errors.login : ''}
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
                         onBlur={formik.handleBlur}
                         error={(formik.errors.password && formik.touched.password) ? true : false}
                         helperText={(formik.errors.password && formik.touched.password) ? formik.errors.password : ''}
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
            <Button size='small'
                    variant="contained" 
                    color="secondary" 
                    fullWidth style={{marginTop: 5,marginBottom: 5}}
            >
              log in anonymously
            </Button>
            <Link className={styles.linkBtn} to={'/login/registration'}>
              <Button color="primary">
                registration
              </Button>
              
            </Link>
        </form>
    )
}
