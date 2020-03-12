import React from 'react'
import { makeStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
  wrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    zIndex: 10000
  }
})

export default function PopUp() {
  const styles = useStyles();

  return (
    <div className={styles.wrap}>
      <CircularProgress size='100px'/>
    </div>
  )
}
