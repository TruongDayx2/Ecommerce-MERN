import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {login} from '../../redux/apiCalls'

import "./login.css";

const Login = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()

    const hanldeClick = (e)=>{
        e.preventDefault()
        login(dispatch,{username,password})
    }
  return (
    <div className='lg_container'>
        <input className='lg_input' type="text" placeholder='username' onChange={e=>setUsername(e.target.value)}/>
        <input className='lg_input' type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}/>
        <button className='lg_btn' onClick={hanldeClick}>
            Login
        </button>
    </div>
  )
}

export default Login