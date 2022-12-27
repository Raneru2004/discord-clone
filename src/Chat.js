import React, { useEffect, useState } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import GifIcon from '@mui/icons-material/Gif'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import Message from './Message'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import { selectChannelId, selectChannelName } from './features/appSlice'
import { addDoc, collection, getDocs, orderBy } from 'firebase/firestore'
import { db } from './firebase'


export default function Chat() {
  const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        async function getAllMessages(){
            if(channelId){
                const {docs} = await getDocs(collection(db, 'channels', channelId, 'messages'))
                const messages = docs.map(doc=> ({id : doc.id, data:doc.data()}))
                setMessages(messages.map((message) => message.data))
            }        
          }
          getAllMessages();

          
    }, [channelId, user, input, channelName]);

    const sendMessage = (e) => {
        const currentDateTime= Date().toLocaleString()
        e.preventDefault()
        const message =
            {
                user: user,
                message: input,
                timeStamp: currentDateTime,
            }
        addDoc(collection(db, 'channels', channelId, 'messages'), message)

        setInput('')
    }


  return (
    <div className='chat'>
      <ChatHeader channelName={channelName}/>

      <div className='chat__messagesContainer'>
        <div className='chat__messages'>
          {messages.map((message) => (
            <Message 
              timeStamp={message.timeStamp}
              message={message.message}
              user={message.user}
            />
          ))}
        </div>
      </div>
      
      <div className='chat__inputContainer'>
        <div className='chat__input'>
          <AddCircleIcon fontSize='large'/>
          <form>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
              <button className='chat__inputButton' type='submit' onClick={sendMessage}>
                  Send Message
              </button>
          </form>

          <div className='chat__inputIcons'>
              <CardGiftcardIcon fontSize='large' />
              <GifIcon fontSize='large'/>
              <EmojiEmotionsIcon fontSize='large' />
          </div>
        </div>
      </div>
    </div>
  )
}
