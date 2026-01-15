import React, { use, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from './store/slices/authSlice';
import { connectSocket } from './lib/socket';
const App = () => {
  
  const {authUser, ischeckingAuth} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [getUser]);

  useEffect(() => {
    if(authUser) {
      const socket = connectSocket(authUser._id);

      
    }
  }, [authUser]);
  return (
    <></>
  )
}

export default App