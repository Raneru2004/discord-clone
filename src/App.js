import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { login, logout, selectUser } from './features/userSlice'
import Login from './Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from './firebase';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const auth = getAuth(firebaseApp);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) =>{
      if (user) {
        dispatch(
          login({
          uid:user.uid,
          email: user.email,
          photoUrl: user.photoURL,
          displayName: user.displayName,
        }))
      } else {
        dispatch(logout())
      }
    })

  },[])
  
  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
          <Login />
      )}
      
    </div>
  );
}

export default App;
