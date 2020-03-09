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
         Link as MaterialLink
        }
        from '@material-ui/core'
import { useFormik } from 'formik'
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
interface Ifields {
  password: string
  email: string
  firstName: string
  surname: string
  date: string
  gender: string
}
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
  if (!fields.gender.length) {
    errors.gender = 'required field'
  }

  return errors
}

export default function RegistrationPage() {
  const styles = useStyles();
  const [gender, setGender] = useState<string>('');
  const [genderChecked, setGenderChecked] = useState(false);
  const changeGender = (gender: string) => {
    if (!genderChecked) {
      setGenderChecked(true);
    }
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
      values.gender = gender;
      alert(JSON.stringify(values, null, 2));
    },
  });
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
            />
          </div>
          <div>
            <TextField placeholder='Surname'
                       name='surname'
                       value={formik.values.surname}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       error={(formik.errors.surname && formik.touched) ? 
                        true : false}
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
                    fullWidth
        />
        <TextField  className={styles.textField}
                    type='password'
                    variant='outlined'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={(formik.errors.password && formik.touched.email) ? 
                     true : false}
                    label='password'
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
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <FormControl
            className={styles.genderInputs}
            fullWidth error={(!gender.length && genderChecked) ? 
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
                onClick={() => changeGender('male')}
              />
              <FormControlLabel 
                value="fimale"
                label="Fimale"
                control={<Radio color="primary"/>}
                checked={gender === 'fimale'}
                onClick={() => changeGender('fimale')}
              />
            </RadioGroup>
            <FormLabel className={styles.center}>
              1
            </FormLabel>
          </FormControl>
        </div>
        <div className={styles.center}>
          <Button variant="contained" color="primary" type="submit">
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
