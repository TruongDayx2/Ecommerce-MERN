import React from 'react'

import './login.css'

const Login = () => {
  return (
    <div className='lg_container'>
        <div className="lg_wrapper">
        <h1 className="lg_title">SIGN IN</h1>
        <form action="" className="lg_form">
          <input type="text" placeholder="Username" className="lg_input" />
          <input type="text" placeholder="Password" className="lg_input" />
          <button className="lg_btn">LOGIN</button>
          <a href="" className="lg_link">DO NOT YOU REMEMBER THE PASSWORD</a>
          <a href="" className="lg_link">CREATE A NEW ACCOUNT</a>
        </form>
      </div>
    </div>
  )
}

export default Login