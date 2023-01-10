import React, { useState } from "react";

import "./register.css";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (event) => {
    /* event.persist(); NO LONGER USED IN v.17*/
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const validationForm = (e) => {
    // let returnData = {
    //   error: false,
    //   msg: "",
    // };
    // //Kiểm tra email
    // const re = /\S+@\S+\.\S+/;
    // if (!re.test(email)) {
    //   returnData = {
    //     error: true,
    //     msg: "Không đúng định dạng email",
    //   };
    // }
    // //Kiểm tra password
    // if (password.length < 6) {
    //   returnData = {
    //     error: true,
    //     msg: "Mật khẩu phải lớn hơn 6 ký tự",
    //   };
    // }
    // return returnData;
  };

  const handleClick = (e) => {
    e.preventDefault();
    const validation = validationForm(e);
    if (validation.error) {
      alert(validation.msg);
    } else {
      alert("Submit form success");
    }
    if (values.firstName && values.lastName && values.email) {
      setValid(true);
    }
    setSubmitted(true);
  };
  return (
    <div className="rg_container">
      <div className="rg_wrapper">
        <h1 className="rg_title">CREATE AN ACCOUNT</h1>
        <form action="" className="rg_form">
          {!valid && (
            <input
              type="text"
              placeholder="Name"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}

          {!valid && (
            <input
              type="text"
              placeholder="Last name"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {!valid && (
            <input
              type="text"
              placeholder="Username"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {!valid && (
            <input
              type="text"
              placeholder="Email"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {!valid && (
            <input
              type="text"
              placeholder="Password"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {!valid && (
            <input
              type="text"
              placeholder="Confirm password"
              className="rg_input"
              onChangonChange={handleInputChange}
            />
          )}
          <span className="rg_agreement">
            By creating an account, I consent to processing of my personal data in accordance with
            the <b>PRIVACY POLICY</b>
          </span>
          <button className="rg_btn" onClick={handleClick}>
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
