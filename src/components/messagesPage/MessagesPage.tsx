import React from 'react'
import DiaglogsList from './DiaglogsList'
import UsersList from './UsersList'
import { Irooms, Idialogs, Imessag } from '../../redux/dialogsReducerType'
import MassagInput from './MassagInput'

interface Iprops {
  roomIdOpen?: string
  roomsList: Irooms
  dialogsSendMessagThunk: (idRoom: string, message: string) => Promise<void>
}

export default function MessagesPage(props: Iprops) {
  let OpenRoomMessages:Idialogs = [];
  let nameRoom = '';
  if (props.roomIdOpen) {
    OpenRoomMessages = props.roomsList[props.roomIdOpen].dialogs
    nameRoom = props.roomsList[props.roomIdOpen].nameRoom
  }
  return (
    <div style={{padding: 15,
      maxWidth: 960,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '200px 1fr 200px',
      justifyContent: 'center'
     }}>
      <DiaglogsList roomsList={props.roomsList}/>
      <MassagInput dialogs={OpenRoomMessages}
                   idRoom={props.roomIdOpen}
                   nameRoom={nameRoom}
                   dialogsSendMessagThunk={props.dialogsSendMessagThunk}
      />
      <UsersList/>
    </div>
  )
}
