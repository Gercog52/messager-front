import React from 'react'
import DiaglogsList from '../messagesPage/DiaglogsList'
import UsersList from '../messagesPage/UsersList'

export default function Content() {
    return (
        <div style={{padding: 15,
                     maxWidth: 960,
                     margin: '0 auto',
                     display: 'flex',
                     justifyContent: 'space-between'
                    }}>
          <DiaglogsList/>
          <UsersList/>
        </div>
    )
}
