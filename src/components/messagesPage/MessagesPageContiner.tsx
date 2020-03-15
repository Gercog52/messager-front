import React from 'react'
import { connect } from 'react-redux'
import MessagesPage from './MessagesPage'
import { Irooms } from '../../redux/dialogsReducerType'
import { IRootState } from '../../redux/store'

interface Iprops {
  roomsList: Irooms
  //usersList: 
}

export function MessagesPageContiner(props: Iprops) {
  return (
    <>
      <MessagesPage roomsList={props.roomsList}/>
    </>
  )
}
export default connect((state: IRootState) => { 
  return {
    roomsList: state.userDialogs.rooms
  }
})(MessagesPageContiner);
