import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/apiCall";
import { Link } from "react-router-dom";


import "./register.css";

const Register = () => {
  const dispatch = useDispatch();
  const { errRegister, errorDetail } = useSelector((state) => state.user);

  const [err, setErr] = useState(false);
  const [errDetail, setErrDetail] = useState("");
  const [errShow, setErrShow] = useState("");

  const checkGetState = () => {
    setErr(errRegister);
    setErrDetail(errorDetail);
  };

  console.log(errDetail);
  // if (errDetail.includes("username")) {
  //   setErrShow("Username đã tồn tại");
  // }
  // if (errDetail.includes("email")) {
  //   setErrShow("Email đã được đăng ký");
  // }

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    lastname: "",
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

  const validationForm = (e) => {
    let returnData = {
      error: false,
      msg: "",
    };
    //Kiểm tra password
    if (values.password !== values.passwordConfirm) {
      returnData = {
        error: true,
        msg: "Mật khẩu không khớp! Vui lòng nhập lại",
      };
    }
    return returnData;
  };

  const handleClick = (e) => {
    e.preventDefault();
    const validation = validationForm(e);
    if (validation.error) {
      alert(validation.msg);
      const name = "passwordConfirm";
      setValues((values) => ({
        ...values,
        [name]: "",
      }));
    } else {
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
      register(dispatch, { ...values });
      checkGetState();
    }
  };

  return (
    <div className="rg_container">
      <div className="rg_wrapper">
        {!err && <h1 className="rg_title">CREATE AN ACCOUNT</h1>}
        <form action="" className="rg_form" onSubmit={handleClick}>
          {submitted && valid && !err && (
            <div className="success-message">
              <h3>
                {" "}
                Welcome {values.name} {values.lastname}{" "}
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
          {submitted && !values.name && <span className="rg_error">Please enter a first name</span>}

          {!valid && (
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {submitted && !values.lastname && (
            <span className="rg_error">Please enter a lastname</span>
          )}

          {!valid && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {submitted && !values.username && (
            <span className="rg_error">Please enter an username</span>
          )}

          {!valid && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {submitted && !values.email && <span className="rg_error">Please enter an email</span>}

          {!valid && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="rg_input"
              onChange={handleInputChange}
            />
          )}
          {submitted && !values.password && (
            <span className="rg_error">Please enter a password</span>
          )}

          {!valid && (
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm password"
              className="rg_input"
              value={values.passwordConfirm}
              onChange={handleInputChange}
            />
          )}
          {submitted && !values.passwordConfirm && (
            <span className="rg_error">Please enter password confirm</span>
          )}

          {!err && (
            <>
              <span className="rg_agreement">
                By creating an account, I consent to processing of my personal data in accordance
                with the <b>PRIVACY POLICY</b>
              </span>
              <button className="rg_btn" type="submit">
                CREATE
              </button>
            </>
          )}
          {err && (
            <>
              <h1 className="rg_title">Xin lỗi</h1>
              {errDetail.includes("username") && <span className="">Username đã tồn tại</span>}
              {errDetail.includes("email") && <span className="">Email đã được đăng ký</span>}
              <Link to="/">
                  <button className="rg_btn">Home</button>
                </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
