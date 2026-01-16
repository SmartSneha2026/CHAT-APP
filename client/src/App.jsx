import React, { use, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, setOnlineUsers } from './store/slices/authSlice';
import { connectSocket, disconnectSocket } from './lib/socket';
import {BrowserRouter as Router , Routes, Route, Navigate} from 'react-router-dom'
import { Loader } from 'lucide-react';
const App = () => {
  
  const {authUser, ischeckingAuth} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [getUser]);

  useEffect(() => {
    if(authUser) {
      const socket = connectSocket(authUser._id);
       
        socket.on('getOnlineUsers', (users) => {
           dispatch(setOnlineUsers(users));
        });
        return () => disconnectSocket();
      }
      if(ischeckingAuth && !authUser) {
        return (
          <div className = "flex items-center justify-center h-screen">
            <Loader className='size-20 animate-spin' />
          </div>
        )
      }
  }, [authUser]);
  return (
    <></>
  )
}

export default App