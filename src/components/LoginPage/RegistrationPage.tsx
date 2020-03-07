import React from 'react'
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
    marginBottom: 15
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
  }
})

export default function RegistrationPage() {
  let styles = useStyles();

    return (
        <form className={styles.regForm}>
          <div className={styles.infoBlock}>
            <div className={styles.regForm__circle}>
              <AddIcon/>
            </div>
            create account
          </div>
          <div className={styles.nameInputs}>
            <div className={styles.firstName}>
              <TextField placeholder='First Name'/>
            </div>
            <div>
              <TextField placeholder='Surname'/>
            </div>
          </div>
          <TextField className={styles.textField}
                     variant='outlined' 
                     label='email'
                     fullWidth/>
          <TextField className={styles.textField}
                     variant='outlined' 
                     label='password'
                     fullWidth/>
          <div className={styles.dateBlock}>
            Birthday
            <TextField
              id="date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <FormControl fullWidth>
              <FormLabel component="legend" className={styles.center}>
                Gender
              </FormLabel>
              <RadioGroup className={styles.genderSelecet}>
                <FormControlLabel 
                  value="male"
                  label="Male"
                  control={<Radio color="primary"/>}
                />
                <FormControlLabel 
                  value="fimale"
                  label="Fimale"
                  control={<Radio color="primary"/>}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={styles.center}>
            <Button variant="contained" color="primary">
              Sign Up
            </Button>
          </div>
            <Link to="/login" className={styles.center}> 
              <MaterialLink>
                to login
              </MaterialLink>
            </Link>
        </form>
    )
}
