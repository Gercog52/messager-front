import React from 'react'
import DiaglogsList from './DiaglogsList'
import UsersList from './UsersList'
import { Irooms, Idialogs } from '../../redux/dialogsReducerType'
import MassagInput from './MassagInput'

interface Iprops {
  roomIdOpen?: string
  roomsList: Irooms
}

export default function MessagesPage(props: Iprops) {
  let OpenRoomMessages:Idialogs = [];
  if (props.roomIdOpen) {
    OpenRoomMessages = props.roomsList[props.roomIdOpen].dialogs
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
      <MassagInput/>
      <UsersList/>
    </div>
  )
}
