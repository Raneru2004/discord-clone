import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'
import {db, auth, provider} from './firebase';
import { signInWithPopup } from "firebase/auth";
import './Login.css'

export default function Login() {

    const dispatch = useDispatch()

    const signIn=()=>{
        signInWithPopup(auth, provider)
        .then(({user}) => {
            dispatch(login({
                uid:user.uid,
                email: user.email,
                photoUrl: user.photoURL,
                displayName: user.displayName,
            }))
        })
        .catch(error => alert(error.message))
    }

  return (
    <div className='login'>
        <div className='login__logo'>
            <img src='https://assets-global.website-files.com/6257adef93867e50d84d30e2/625eb604bb8605784489d361_Discord-Logo%2BWordmark-Color%20(1).png' 
                alt='discord' 
            />
        </div>

        <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}
