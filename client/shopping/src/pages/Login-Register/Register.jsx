import React from "react";

import "./register.css";

const Register = () => {
  return (
    <div className="rg_container">
      <div className="rg_wrapper">
        <h1 className="rg_title">CREATE AN ACCOUNT</h1>
        <form action="" className="rg_form">
          <input type="text" placeholder="Name" className="rg_input" />
          <input type="text" placeholder="Last name" className="rg_input" />
          <input type="text" placeholder="Username" className="rg_input" />
          <input type="text" placeholder="Email" className="rg_input" />
          <input type="text" placeholder="Password" className="rg_input" />
          <input type="text" placeholder="Confirm password" className="rg_input" />
          <span className="rg_agreement">
            By creating an account, I consent to processing of my personal data in accordance with
            the <b>PRIVACY POLICY</b>
          </span>
          <button className="rg_btn">CREATE</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
