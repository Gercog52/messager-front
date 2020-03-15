import React from 'react'
import DiaglogsList from './DiaglogsList'
import UsersList from './UsersList'
import { Irooms } from '../../redux/dialogsReducerType'

interface Iprops {
  roomsList: Irooms
}

export default function MessagesPage(props: Iprops) {
  return (
    <div style={{padding: 15,
      maxWidth: 960,
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between'
     }}>
      <DiaglogsList roomsList={props.roomsList}/>
      <UsersList/>
    </div>
  )
}
