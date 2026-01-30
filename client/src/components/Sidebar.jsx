import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Sidebar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const {users, selectedUser, isUsersLoading } = useSelector(
    (state) =>state.chat
  );

  const {onlineUsers} = useSelector ((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() =>{
  //  dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

  
    return (
    <></>
  )
}

export default Sidebar