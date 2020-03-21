import React from 'react'
import { connect } from 'react-redux'
import MessagesPage from './MessagesPage'
import { Irooms } from '../../redux/dialogsReducerType'
import { IRootState } from '../../redux/store'
import { withRouter, RouteComponentProps, match } from 'react-router-dom'

interface Iprops extends RouteComponentProps {
  math: match<{roomId?: string}>
  roomsList: Irooms
}

export function MessagesPageContiner(props: Iprops) {
  return (
    <>
      <MessagesPage roomsList={props.roomsList}
                    roomIdOpen={props.math.params.roomId}
      />
    </>
  )
}
export default connect((state: IRootState) => { 
  return {
    roomsList: state.userDialogs.rooms
  }
})(withRouter(MessagesPageContiner));
