import { Avatar } from '@mui/material'
import React from 'react'
import './Message.css'

export default function Message({ timeStamp, user, message }) {
  return (
    <div className='message'>
        <Avatar src={user.photoUrl}/>
        <div className='message__info'>
            <h4>{user.displayName}
                <span className='message__timestamp'>{new Date(timeStamp).toUTCString()}</span>
            </h4>

            <p>{message}</p>
        </div>
    </div>
  )
}
