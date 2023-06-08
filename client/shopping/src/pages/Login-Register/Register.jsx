import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, otp } from "../../redux/apiCall";
import { Link, Navigate, useNavigate } from "react-router-dom";

import "./register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errRegister, errorDetail } = useSelector((state) => state.user);

  const [err, setErr] = useState(false);
  const [errDetail, setErrDetail] = useState("");
  const [errShow, setErrShow] = useState("");

  const checkGetState = () => {
    setErr(errRegister);
    setErrDetail(errorDetail);
  };

  console.log(errDetail);

  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
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
        values.firstName &&
        values.lastName &&
        values.email &&
        values.password &&
        values.passwordConfirm
      ) {
        setValid(true);
      }
      setSubmitted(true);
      fetchData();

    }
  };

  const [otpCheck, setOtpCheck] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [optInput, setoptInput] = useState("");
  const [success, setSuccess] = useState(false);

  const fetchData = async () => {
    const res = await otp({ email: values.email });
    if (res.status === 200) {
      setOtpCheck(res.data.data[0].otp);

      setIsModal(true);
    } else {
      setOtpCheck("");
      alert("This email had been registered");
      window.location.reload();
    }
  };
  const fetchRegister = async () => {
    if (optInput === otpCheck.toString()) {
      // console.log('1')
      const res = await register(dispatch, values);
      console.log(res);
      if (res.status === 200) {
        setSuccess(true);
        setIsModal(false);
        alert("Successfull");
        navigate('../login')
      }else {
        alert("Failure");
      }
    }
  };
  const handleSubmitOtp = (e) => {
    e.preventDefault()
    fetchRegister();
    
  };

  return (
    <div className="rg_container">
      {!submitted && !isModal && (
        <div className="rg_wrapper">
          {!err && <h1 className="rg_title">CREATE AN ACCOUNT</h1>}
          {!err && <form action="" className="rg_form" onSubmit={handleClick}>
            {/* {submitted && valid && !err && (
              <div className="success-message">
                <h3>
                  {" "}
                  Welcome {values.name} {values.lastname}{" "}
                </h3>
                <div> Your registration was successful! </div>
              </div>
            )} */}
            {!valid && (
              <input
                type="text"
                name="firstName"
                placeholder="Name"
                className="rg_input"
                onChange={handleInputChange}
              />
            )}
            {submitted && !values.firstName && (
              <span className="rg_error">Please enter a first name</span>
            )}

            {!valid && (
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="rg_input"
                onChange={handleInputChange}
              />
            )}
            {submitted && !values.lastName && (
              <span className="rg_error">Please enter a lastname</span>
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
                <div className="rg_wrapper1">
                  <span className="rg_agreement">
                    By creating an account, I consent to processing of my personal data in
                    accordance with the <b>PRIVACY POLICY</b>
                  </span>
                  <button className="rg_btn" type="submit">
                    CREATE
                  </button>
                </div>
              </>
            )}
          </form>}
        </div>
      )}

      {err && (
        <>
          <div className="rg_wrapper1">
            <h1 className="rg_title">Sorry!</h1>
            {errDetail.includes("username") && <span className="">Username đã tồn tại</span>}
            {errDetail.includes("email") && <span className="">Email đã được đăng ký</span>}
            <Link to="/">
              <button className="rg_btn">Home</button>
            </Link>
          </div>
        </>
      )}
      {isModal && (
        <div className="rg_modal" style={{border:'2px solid teal',borderRadius:'10px'}}>
          <h3 className="rg_md_title">Please Enter OTP from your email</h3>
          <input
            type="text"
            maxLength={6}
            className="re_md_input"
            style={{marginTop:'20px',marginBottom:'20px',padding:'10px'}}
            onChange={(e) => setoptInput(e.target.value)}
          />
          <div className="rg_md_btn" style={{display:'flex',justifyContent:'center'}}>
              <button className="or_detailBtn" style={{flex:2,marginRight:'10px'}} onClick={()=>{window.location.reload();}}>Cancel</button>
            <Link to={"/login"}style={{flex:2}}>
              <button className="or_detailBtn" style={{marginLeft:'10px'}} onClick={(e) => handleSubmitOtp(e)}>Submit</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
