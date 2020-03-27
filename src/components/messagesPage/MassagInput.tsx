import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Icon, Button, makeStyles } from '@material-ui/core';
import { Idialogs, Imessag } from '../../redux/dialogsReducerType';


interface Iprops {
  idRoom?: string
  nameRoom: string
  dialogs: Idialogs
  dialogsSendMessagThunk: (idRoom: string, nameRoom: string, message: string) => Promise<void>
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
  const [message, setMessage] = useState('');
  
  const handleSubmit = () => {
    if (message.length && props.idRoom) {
      props.dialogsSendMessagThunk(props.idRoom, props.nameRoom, message)
      setMessage('')
    }
  }

  return (
    <div style={{
      maxWidth: '1000px',
      padding: '0 15px',
      marginTop: 5,
    }}>
      <div className={styles.messagesContiner}>
        {props.dialogs.map((item) => 
          <div key={item.id} className={styles.messag}>
            {item.message}
          </div>
        )}
      </div>
      <form style={{display: 'flex', flexDirection: 'column', marginTop: 15}}
            onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-textarea"
          label="messag"
          placeholder="messag"
          size='medium'
          variant="outlined"
          fullWidth
          multiline
          value={message}
          onChange={(e) => {setMessage(e.target.value)}}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{marginTop: 10}}
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </form>
    </div>
  )
}
