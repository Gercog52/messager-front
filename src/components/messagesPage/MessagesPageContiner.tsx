import React from 'react'
import { connect } from 'react-redux'
import MessagesPage from './MessagesPage'
import { Irooms, Imessag } from '../../redux/dialogsReducerType'
import { IRootState } from '../../redux/store'
import { withRouter, RouteComponentProps, match } from 'react-router-dom'
import { dialogsSendMessagThunk } from '../../redux/dialogsReducer'

interface Iprops extends RouteComponentProps {
  match: match<{roomId?: string}>
  roomsList: Irooms
  dialogsSendMessagThunk: (idRoom: string, message: string) => Promise<void>
}

export function MessagesPageContiner(props: Iprops) {
  return (
    <>
      <MessagesPage roomsList={props.roomsList}
                    roomIdOpen={props.match.params.roomId}
                    dialogsSendMessagThunk={props.dialogsSendMessagThunk}
      />
    </>
  )
}
export default connect((state: IRootState) => { 
  return {
    roomsList: state.userDialogs.rooms
  }
}, {
  dialogsSendMessagThunk
})(withRouter(MessagesPageContiner));
