import React from 'react'
import './Sidebar.css'
import { setChannelInfo } from './features/appSlice'
import './SidebarChannel.css'
import { useDispatch } from 'react-redux'

export default function SidebarChannel({ id, channelName }) {
  const dispatch = useDispatch()

  return (
    <div className='sidebarChannel' onClick={() => 
      dispatch(setChannelInfo({
        channelId: id,
        channelName: channelName,
    }))}>
        <h4>
            <span className='sidebarChannel__hash'>#</span>
            {channelName}
        </h4>
    </div>
  )
}
