import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/userSlice';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { query, orderBy, limit } from "firebase/firestore";  

export default function Sidebar() {

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    async function getAllChannels(){
        const {docs} = await getDocs(collection(db, "channels"))
        
        const channels =docs.map(doc=> ({id : doc.id, data:doc.data()}))
        setChannels(channels)
        return channels
    
      }
      getAllChannels();
  },[])
  const signOut = () => {
    dispatch(logout())
  }

  const handleAddChannel = (event) => {
    event.preventDefault();
    const channelName = prompt("Enter a new channel name")

    if (channelName){  
        const channel =
            {
                channelName,    
            }
        addDoc(collection(db, "channels"), channel) 
    }
  }

  return (
    <div className='sidebar__container'>
        <div className='sidebar'>
            <div className='sidebar__top'>
                <h3>Raneru</h3>
                <ExpandMoreIcon />
            </div>

            <div className='sidebar__channels'>
                <div className='sidebar__channelsHeader'>
                    <div className='sidebar__header'>
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>

                    <AddIcon onClick={handleAddChannel} className='sidebar__addChannel' />
                </div>

                <div className='sidebar__channelsList'>
                    {channels.map(({ id, data }) => (
                        <SidebarChannel 
                            key={id}
                            id={id}
                            channelName={data.channelName}
                        />
                    ))}
                </div>
            </div>

            <div className='sidebar__voice'>
                <SignalCellularAltIcon
                    className='sidebar__voiceIcon'
                    fontSize='large'
                />

                <div className='sidebar__voiceInfo'>
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className='sidebar__voiceIcons'>
                    <InfoIcon />
                    <CallIcon />
                </div>
            </div>

            <div className='sidebar__profile'>
                <Avatar 
                    onClick={signOut}
                    src={user.photoUrl}
                    className='avatar'
                />

                <div className='sidebar__profileInfo'>
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>

                <div className='sidebar__profileIcons'>
                    <MicIcon />
                    <HeadphonesIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    </div>
  )
}
