import React from 'react'
import MessagesPageContiner from '../messagesPage/MessagesPageContiner'
import { Route } from 'react-router-dom'

export default function Content() {
    return (
        <div>
          <Route path={'/dialogs/:roomId?'} component={MessagesPageContiner}/>
        </div>
    )
}
