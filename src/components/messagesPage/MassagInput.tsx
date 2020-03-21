import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Icon, Button } from '@material-ui/core';


export default function MassagInput() {
  return (
    <div style={{
      maxWidth: '1000px',
      padding: '0 15px'
    }}>
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
