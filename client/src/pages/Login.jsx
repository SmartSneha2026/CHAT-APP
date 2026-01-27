import React from 'react'
import {Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, } from "lucide-react";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
  const [showPassword , setShowPassword] = useState(false);
  const [formData, setFormData] =useState({
    email: "",
    password : "",
  });
  const {isLoggingIn} = useSelector(state =>state.auth)
  const dispatch = useDispatch();

  const handleSubmit = (e) =>{
    e.preventDefault();
    //dispatch(login(formData));
  }
  return (
    <>
    <div className='min-h-screen grid grid-cols-1 lg-grid-cols-2 bg-white'>
        {/*LEFT SIDE - Form */}
        <div className='flex flex-col justify-center  items-center px-6 py-12'>
            <div className='w-full max-w-md'>
                {/* LOGO & Heading */}
                <div className='flex flex-col items-center text-center mb-10'>
                    <div className='bg-blue-100 p-3 rounded-lg'>
                        <MessageSquare className='text-blue-600 w-6 h-6'/>
                    </div>
                    <h1 className='text-2xl font-bold mt-4'>Welcome Back</h1>
                    <p className='text-gray-500 text-sm mt-2'>
                        Sign in to your account
                    </p>
                </div>

                {/* LOGIN FORM */}
            </div>
        </div>
    </div>
    </>
  )
}

export default Login