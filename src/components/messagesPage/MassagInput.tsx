import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Icon, Button, makeStyles } from '@material-ui/core';
import { Idialogs } from '../../redux/dialogsReducerType';


interface Iprops {
  dialogs: Idialogs
}
const useStyle = makeStyles({
  messagesContiner: {
    display: 'flex',
    flexDirection: 'column'
  },
  messag: {
    display: 'inline-block',
    width: 'max-content',
    borderRadius: 10,
    background: '#3E97F2',
    color: '#fff',
    margin: '5px 0px',
    padding: 10
  }//#9E9E9E
})

export default function MassagInput(props: Iprops) {
  const styles = useStyle();
  
  return (
    <div style={{
      maxWidth: '1000px',
      padding: '0 15px'
    }}>
      <div className={styles.messagesContiner}>
        {props.dialogs.map((item) => 
          <div key={item.id} className={styles.messag}>
            {item.message}
          </div>
        )}
      </div>
      <form style={{display: 'flex', flexDirection: 'column'}}>
        <TextField
          id="outlined-textarea"
          label="messag"
          placeholder="messag"
          size='medium'
          variant="outlined"
          fullWidth
          multiline
        />
        <Button
          variant="contained"
          color="primary"
          style={{marginTop: 10}}
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </form>
      
    </div>
  )
}
