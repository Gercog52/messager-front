import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, 
         TextField, 
         Button, 
         FormControl, 
         FormLabel, 
         RadioGroup,
         FormControlLabel,
         Radio,
        }
        from '@material-ui/core'
import { useFormik } from 'formik'
import {IregistrationData as Ifields, IregistrationData} from '../../api/apiType'
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  regForm: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    maxWidth: 400,
    margin: '0 auto',
  },
  infoBlock: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 25,
  },
  regForm__circle: {
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
  nameInputs: {
    display: 'flex',
  },
  firstName: {
    marginRight: 15,
  },
  textField: {
    marginTop: 15,
  },
  dateBlock: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '15px 0',
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 0,
    fontSize: '1rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1,
  },
  genderSelecet: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  loginBtn: {
    background: '#228B22',
    color: 'white',
    '&:focus': {
      background: 'green'
    },
    '&:hover': {
      background: 'green'
    }
  },
  linkTologin: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    textDecoration: 'node'
  },
  genderInputs: {
    marginBottom: 20,
  }
});

interface IerrorsField {
  password?: string
  email?: string
  firstName?: string
  surname?: string
  date?: string
  gender?: string
}
function validate (fields: Ifields): IerrorsField {
  const errors:IerrorsField = {};
  if (!fields.email) {
    errors.email = 'required field'
  }
  if (!fields.firstName.length) {
    errors.firstName = 'required field'
  }
  if (!fields.surname.length) {
    errors.surname = 'required field'
  }
  if (!fields.password.length) {
    errors.password = 'required field'
  }
  if (fields.date === '2001-01-01') {
    errors.date = 'required field'
  }
  return errors
}
interface Iprops {
  submitFunc: (data: IregistrationData) => Promise<void>
}

export default function RegistrationPage(props:Iprops) {
  const styles = useStyles();
  const [gender, setGender] = useState<string>('');
  const [genderError, setGenderError] = useState(false);
  const chengeGender = (gender: string) => {
    setGenderError(false);
    setGender(gender);
  }
  const formik = useFormik({
    validate,
    initialValues: {
      password: '',
      email: '',
      firstName: '',
      surname: '',
      date: '2001-01-01',
      gender: gender
    },
    onSubmit: values => {
      if (gender === '') {
        setGenderError(true);
      } else {
        values.gender = gender;
        props.submitFunc(values);
      }
    },
  });
  const setErrorText = (nameObject: 'date'|'password'|'firstName'|'surname'|'email'):any => {
    return (formik.errors && formik.errors[nameObject] && formik.touched[nameObject]) ? formik.errors[nameObject] : ' '
  }
  return (
      <form className={styles.regForm} onSubmit={formik.handleSubmit}>
        <div className={styles.infoBlock}>
          <div className={styles.regForm__circle}>
            <AddIcon/>
          </div>
          create account
        </div>
        <div className={styles.nameInputs}>
          <div className={styles.firstName}>
            <TextField placeholder='First Name'
                       name='firstName'
                       value={formik.values.firstName}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       error={(formik.errors.firstName && formik.touched.firstName) ?
                        true : false}
                       helperText={setErrorText('firstName')}
            />
          </div>
          <div>
            <TextField placeholder='Surname'
                       name='surname'
                       value={formik.values.surname}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       error={(formik.errors.surname && formik.touched.surname) ? 
                        true : false}
                       helperText={setErrorText('surname')}
            />
          </div>
        </div>
        <TextField className={styles.textField}
                    variant='outlined' 
                    label='email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={(formik.errors.email && formik.touched.email) ?
                     true : false}
                    helperText={setErrorText('email')}
                    fullWidth
        />
        <TextField  className={styles.textField}
                    type='password'
                    variant='outlined'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={(formik.errors.password && formik.touched.password) ? 
                     true : false}
                    label='password'
                    helperText={setErrorText('password')}
                    fullWidth
        />
        <div className={styles.dateBlock}>
          Birthday
          <TextField
            id="date"
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.errors.date && formik.touched.date) ?
             true : false}
            helperText={setErrorText('date')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <FormControl
            className={styles.genderInputs}
            fullWidth error={(genderError) ? 
            true : false}
          >
            <FormLabel component="legend" className={styles.center}>
              Gender
            </FormLabel>
            <RadioGroup className={styles.genderSelecet}
            >
              <FormControlLabel 
                value="male"
                label="Male"
                control={<Radio color="primary"/>}
                checked={gender === 'male'}
                onClick={() => chengeGender('male')}
              />
              <FormControlLabel 
                value="fimale"
                label="Fimale"
                control={<Radio color="primary"/>}
                checked={gender === 'fimale'}
                onClick={() => chengeGender('fimale')}
              />
            </RadioGroup>
            {(genderError) ? 
              <FormLabel className={styles.center}>
                required field
              </FormLabel> : ''
            }
          </FormControl>
        </div>
        <div className={styles.center}>
          <Button variant="contained" color="primary" type="submit" onClick={() => {(!gender.length) ?
           setGenderError(true) : setGenderError(false)}}>
            Sign Up
          </Button>
        </div>
          <Link to="/login" className={styles.linkTologin}> 
            <Button variant="outlined" size="small" color="primary">
              go to login
            </Button>
          </Link>
      </form>
    )
}
