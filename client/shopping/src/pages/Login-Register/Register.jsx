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
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  //const validationForm = (e) => {
  //   let returnData = {
  //     error: false,
  //     msg: "",
  //   };
  //   //Kiểm tra email
  //   const re = /\S+@\S+\.\S+/;
  //   if (!re.test(email)) {
  //     returnData = {
  //       error: true,
  //       msg: "Không đúng định dạng email",
  //     };
  //   }
  //   //Kiểm tra password
  //   if (password.length < 6) {
  //     returnData = {
  //       error: true,
  //       msg: "Mật khẩu phải lớn hơn 6 ký tự",
  //     };
  //   }
  //   return returnData;
  // };

  const handleClick = (e) => {
    e.preventDefault();
    // const validation = validationForm(e);
    // if (validation.error) {
    //   alert(validation.msg);
    // } else {
    //   alert("Submit form success");
    // }
    if (
      values.name &&
      values.lastname &&
      values.email &&
      values.username &&
      values.password &&
      values.passwordConfirm
    ) {
      setValid(true);
    }
    setSubmitted(true);
  };
  console.log(values)
  console.log('valid: ',valid);
  return (
    <div className="rg_container">
      <div className="rg_wrapper">
        <h1 className="rg_title">CREATE AN ACCOUNT</h1>
        <form action="" className="rg_form" onSubmit={handleClick}>
        {submitted && valid && (
          <div className="success-message">
            <h3>
              {" "}
              Welcome {values.firstName} {values.lastName}{" "}
            </h3>
            <div> Your registration was successful! </div>
          </div>
        )}
          {!valid && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {submitted && !values.name && <span id="rg_error">Please enter a first name</span>}

          {!valid && (
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {submitted && !values.lastname && <span id="rg_error">Please enter a lastname</span>}

          {!valid && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {submitted && !values.username && <span id="rg_error">Please enter an username</span>}

          {!valid && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {submitted && !values.email && <span id="rg_error">Please enter an email</span>}

          {!valid && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {submitted && !values.password && <span id="rg_error">Please enter a password</span>}

          {!valid && (
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm password"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {submitted && !values.passwordConfirm && <span id="rg_error">Please enter password confirm</span>}

          <span className="rg_agreement">
            By creating an account, I consent to processing of my personal data in accordance with
            the <b>PRIVACY POLICY</b>
          </span>
          <button className="rg_btn" type="submit">
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
