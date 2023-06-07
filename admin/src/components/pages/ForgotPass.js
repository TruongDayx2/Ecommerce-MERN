import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { forgotPass } from '../../redux/actions/userActions';



const ForgotPassPage = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const userForgotPass = useSelector((state) => state.userForgotPass);

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (email) {
            dispatch(forgotPass(email));
        }
    }

    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div className="brand-logo">
                                        <img src="assets/images/logo.jpg" alt="logo" />
                                    </div>
                                    <h4>Hello! let's get started</h4>
                                    <h6 className="fw-light">Sign in to continue.</h6>
                                    <form className="pt-3" onSubmit={submitHandler} autoComplete="off">
                                        <div className="form-group">
                                            <input type="email" className={'form-control form-control-lg' + (submitted && !email ? ' is-invalid' : '')}
                                                name="email"
                                                placeholder="Email"
                                                onChange={handleChange}
                                                value={email || ''}
                                            />
                                            {submitted && !email &&
                                                <div className="inline-errormsg">Email is required</div>
                                            }
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SUBMIT</button>
                                        </div>
                                        <div className="my-2 d-flex justify-content-between align-items-center">
                                            <div className="form-check">
                                            </div>
                                            <a href="/login" className="auth-link text-black">Sign in?</a>
                                        </div>
                                        <div className="text-center mt-4 fw-light">
                                            Don't have an account? <Link to="/register" className="text-primary">Create</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ForgotPassPage
