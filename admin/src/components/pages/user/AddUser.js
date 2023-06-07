import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import {createUser} from '../../../redux/actions/userActions'; 
import { useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { toast } from "react-toastify";
import FileBase64 from 'react-file-base64';



const AddUser = () => {
	const [submitted, setSubmitted] = useState(false);
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [img, setImg] = useState('');
	const [uploading, setUploading] = useState(false);
	const [role, setRole] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const {userInfo} = userLogin;

	const submitHandler = (e) => {
		e.preventDefault();
		setSubmitted(true);
		if (name === '' || lastname === '' || email === '' || password === '' || confirmPassword === '') {
			toast.error("Please fill all fields");
		} else
		if (password !== confirmPassword) {
			toast.error("Password and Confirm Password do not match");
		} else {
			dispatch(createUser(name, lastname, email, isAdmin, password, img));
			// clearForm();
		}
	}

	const clearForm = () => {
		setName('');
		setLastname('');
		setEmail('');
		setIsAdmin(false);
		setPassword('');
		setConfirmPassword('');
		setImg('');
	}

	useEffect(() => {
		if (userInfo) {
			const decoded = jwt_decode(userInfo.token);
			setRole(decoded.role);
		}
	}
		, [userInfo])
	
	return (
		<>
			<div className="container-scroller">
				<Header />
				<pre>{JSON.stringify(img, null, '\t')}</pre>
				<div className="container-fluid page-body-wrapper">
					<Sidebar />
					<div className="main-panel">
						<div className="content-wrapper">
							<div className="row">
								<div className="col-12 grid-margin">
									<div className="card">
										<div className="card-body">
											<h4 className="card-title">Add User</h4>
											<form className="form-sample" onSubmit={submitHandler}>
												<p className="card-description"> Personal info </p>
												<div className="row">
													<div className="col-md-6">
														<div className="form-group row">
															<label className="col-sm-3 col-form-label">First Name</label>
															<div className="col-sm-9">
																<input type="text" className="form-control" placeholder="First Name" value={name} onChange={(e) => setName(e.target.value)} />
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group row">
															<label className="col-sm-3 col-form-label">Last Name</label>
															<div className="col-sm-9">
																<input type="text" className="form-control" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													
													<div className="col-md-6">
														<div className="form-group row">
															<label className="col-sm-3 col-form-label">Email</label>
															<div className="col-sm-9">
																<input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6">
														<div className="form-group row">
															<label className="col-sm-3 col-form-label">Password</label>
															<div className="col-sm-9">
																<input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group row">
															<label className="col-sm-3 col-form-label">Confirm Password</label>
															<div className="col-sm-9">
																<input type="password" className="form-control" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
															</div>
														</div>
													</div>
												</div>
												<p className="card-description"> User Role </p>
												<div className="row">
													<div className="col-md-6">
														<div className="form-group row">
															<label className="col-sm-3 col-form-label">Admin</label>
															<div className="col-sm-9">
																<div className="form-check">
																	<label className="form-check-label">
																		<input type="checkbox" className="form-check-input" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
																		Is Admin
																		<i className="input-helper"></i>
																	</label>
																</div>
															</div>
														</div>
													</div>
												</div>
												<p className="card-description"> Upload Image </p>
												<div className="row">
													<div className="col-md-6">
														<div className="form-group row">
															<label className="col-sm-3 col-form-label">Image</label>
															<div className="col-sm-9">
															<input type="file"  accept="image/jpeg" className={'form-control form-control-lg' + (submitted && !img ? ' is-invalid' : '')}	
																	name="img"
																	onChange={(e)=>	setImg(e.target.value)}
																	value={img}
																/>
															</div>
														</div>
													</div>
												</div>
												<button type="submit" className="btn btn-primary mr-2">Submit</button>
												<Link to="/users" className="btn btn-light">Cancel</Link>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>

						<Footer />
					</div>
				</div>
			</div>
		</>
	)
}

export default AddUser;