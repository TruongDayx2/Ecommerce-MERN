import React, { useState } from 'react'
import { login } from "../../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";
import './login.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <div className='lg_container'>
        <div className="lg_wrapper">
        <h1 className="lg_title">SIGN IN</h1>
        <form action="" className="lg_form">
          <input type="text" placeholder="Username" className="lg_input" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="lg_input" onChange={(e) => setPassword(e.target.value)} />
          <button className="lg_btn" onClick={handleClick} disabled={isFetching}>LOGIN</button>
          {error && (<span className="lg_err">Something went wrong...</span>)}
          <a href="" className="lg_link">DO NOT YOU REMEMBER THE PASSWORD</a>
          <a href="" className="lg_link">CREATE A NEW ACCOUNT</a>
        </form>
      </div>
    </div>
  )
}

export default Login