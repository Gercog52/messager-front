import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Icon, Button, makeStyles } from '@material-ui/core';
import { Idialogs, Imessag } from '../../redux/dialogsReducerType';


interface Iprops {
  idRoom?: string
  nameRoom: string
  dialogs: Idialogs
  dialogsSendMessagThunk: (idRoom: string, message: string) => Promise<void>
}
const useStyle = makeStyles({
  messagesContiner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
    maxHeight: 900,
  },
  imgSender: {
    height: 50,
    width: 50,
    background: '#3054B1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textTransform: 'uppercase',
    borderRadius: 100,
    marginRight: 15,
    color: '#fff'
  },
  messag: {
    display: 'inline-block',
    width: 'max-content',
    borderRadius: 10,
    background: '#3E97F2',
    color: '#fff',
    margin: '2.5px 0px',
    padding: 10,
  },//#9E9E9E,
  messagLine: {
    display: 'flex'
  },
  hollowBlock: {
    marginLeft: 65
  },
  name: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 600,
    marginBottom: 5,
  }
})

export default function MassagInput(props: Iprops) {
  const styles = useStyle();
  const [message, setMessage] = useState('');
  
  const handleSubmit = () => {
    if (message.length && props.idRoom) {
      props.dialogsSendMessagThunk(props.idRoom, message)
      setMessage('')
    }
  }
  let buf = '';
  return (
    <div style={{
      maxWidth: '1000px',
      padding: '0 15px',
      marginTop: 5,
    }}>
      <div className={styles.messagesContiner}>
        {props.dialogs.map((item, index) => {
          const flag = (item.senderId !== (props.dialogs[index+1] && props.dialogs[index+1].senderId));
          const flag2 = buf !== item.senderId;
          buf = item.senderId;
          return (
            <div className={styles.messagLine} key={item.id}>
              {
                flag && 
                <div className={styles.imgSender}>
                  {item.senderId[0]}
                </div>
              }
              <div key={item.id} className={styles.messag + ' ' + ((!flag) && styles.hollowBlock)}>
                {
                  flag2 && <div className={styles.name}>
                    {item.senderId}
                  </div>
                }
                {item.message}
              </div>
            </div>
          )
        }
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
