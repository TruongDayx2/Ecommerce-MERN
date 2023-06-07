import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import { editOrder , deliverOrder , cancelOrder} from '../../../redux/actions/OrderActions';
import { ORDER_UPDATE_RESET } from "../../../redux/constants/OrderConstants";
import { toast } from "react-toastify";
import { ToastObjects } from '../../../redux/actions/toastObject';
import './order.css';
import axios from "axios";
import jwt_decode from "jwt-decode";


const EditOrder = ({ match }) => {
	const orderId = match.params.id;
	const [submitted, setSubmitted] = useState(false);
	const dispatch = useDispatch();

	const { userLogin: { userInfo: { data } } } = useSelector((state) => state);
	console.log('data', data);
	const orderEdit = useSelector((state) => state.orderEdit);
	const { loading, error, order } = orderEdit;
	console.log('order', order);
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	
	const [userState, setUserState] = useState(userInfo);

	const orderUpdate = useSelector((state) => state.orderUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = orderUpdate;

	const [formState, setFormState] = useState({
		values: {}
	});



	

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: ORDER_UPDATE_RESET });
			toast.success('Update order successfully!', ToastObjects);
		}
		if (order._id !== orderId) {
			dispatch(editOrder(orderId));
		}
		else {
			setFormState((formState) => ({
				values: order
			}));
		}
	}, [order, dispatch, orderId, successUpdate]);


	const refreshToken = async () => {
		try {
			const res = await axios.post("auth/refreshToken", { token: userInfo.refreshToken });
			setUserState({
				...userState,
				token: res.data.token,
				refreshToken: res.data.refreshToken,
			});
			return res.data;
		} catch (err) {
			console.log(err);
		}
	};

	const axiosJWT = axios.create()

	axiosJWT.interceptors.request.use(
		async (config) => {
			let currentDate = new Date();
			const decodedToken = jwt_decode(userState.token);
			if (decodedToken.exp * 1000 < currentDate.getTime()) {
				const data = await refreshToken();
				config.headers["authorization"] = "Bearer " + data.token;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
	console.log('order111111', order)
	const [orderState, setOrderState] = useState(order);


	console.log('values', formState.values)
	console.log('order2222222', order)
	console.log('orderState', orderState)


	//sum price all product in order
	const sumPrice = (order) => {
		let sum = 0;
		order.products.map((item) => {
			sum += item.productId.price * item.quantity;
		});
		return sum;
	};


	
	const deliverHandler = (e) => {
		e.preventDefault();
		order.status = 'Delivered';
		dispatch(deliverOrder(orderId));
	};

	const cancelHandler = (e) => {
		e.preventDefault();
		order.status = 'Cancelled';
		dispatch(cancelOrder(orderId));
	};


	return (
		<>
			<div className="container-scroller">
				<Header />
				<div className="container-fluid page-body-wrapper">
					<Sidebar />
					<div className="main-panel">
						<div className="content-wrapper">
							<div className="row">
								<div className="col-12 grid-margin">
									<div className="card">
										<div className="card-body">
											<div className="clearfix mb-4">
												<h4 className="float-left">Order Details</h4>
												<Link to="/orders" className="btn btn-outline-primary float-right">Back to Orders</Link>
											</div>
											<form className="form-sample clear-fix">
												<div className="card">
													<h5 className="card-header">
														<div className="float-left">
															<span>
																<i className="fa fa-calendar"></i>
																<b>{moment(order.createdAt).format('llll')}</b>
															</span>
															<br />
															<small>
																Order ID: {order._id}
															</small>
														</div>
														<div className="float-right">
															{(order.status === 'Delivered' || order.status === 'Cancelled') ? (
																order.status === 'Delivered' ? (<span className="btn btn-success me-2 cursor-auto">{order.status } on {moment(order.updatedAt).format('llll')}</span>) : 
																(<span className="btn btn-danger me-2 cursor-auto">{order.status } on {moment(order.updatedAt).format('llll')}</span>)
															) : (
																<>
																	{
																		loading ?
																			""
																			: <>
																			<button className="btn btn-primary me-2" onClick={deliverHandler}>Mark as Delivered</button>
																			<buton className="btn btn-danger me-2" onClick={cancelHandler}>Cancel Order</buton>
																			</>
																	}
																</>
															)}

														</div>
													</h5>

													<div className="card-body">
														<div className="row">
															<div className="col-sm-4">
																<div className="card">
																	<div className="card-body main-lable">
																		<article className="icontext align-items-start">
																			<span className="icon icon-sm rounded-circle alert-success"><i className="text-success fa fa-user" /></span>
																			<div className="text">
																				<h5 className="card-title mb-2">Customer</h5>
																				<p className="mb-1">{order?.userId?.name } <br /><a href="#">{order?.userId?.email}</a></p>
																			</div>
																		</article>
																	</div>
																</div>
															</div>
															<div className="col-sm-4">
																<div className="card">
																	<div className="card-body main-lable">
																		<article className="icontext align-items-start">
																			<span className="icon icon-sm rounded-circle alert-success"><i className="text-success fa fa-truck" /></span>
																			<div className="text">
																				<h5 className="card-title mb-2">Order info</h5>
																				<p className="mb-1">
																					
																				</p>
																				<p className="mb-1">
																					Status: {order.status != 'Delivered' ? <span className="badge badge-pill badge-danger">{order.status}</span> : <span className="badge badge-pill badge-success">{order.status}</span>}
																				</p>
																			</div>
																		</article>
																	</div>
																</div>
															</div>
															<div className="col-sm-4">
																<div className="card">
																	<div className="card-body main-lable">
																		<article className="icontext align-items-start">
																			<span className="icon icon-sm rounded-circle alert-success"><i className="text-success fa fa-map-marker" /></span>
																			<div className="text">
																				<h5 className="card-title mb-2">Deliver to</h5>
																				<p className="mb-1 card-text">
																					{order.address}<br />
																		
																				</p>
																			</div>
																		</article>
																	</div>
																</div>
															</div>
														</div>
														<div className="row mt-4">
															{
																(order.products && order.products.length) > 0 ?
																	(
																		<div className="col-sm-12">
																			<table className="table">
																				<thead className="thead-light">
																					<tr>
																						<th scope="col">Product</th>
																						<th scope="col">Unit Price</th>
																						<th scope="col">Quantity</th>
																						<th scope="col" className="text-end">Total</th>
																					</tr>
																				</thead>
																				<tbody>
																					{order.products.map((item) => (
																						<tr key={item._id}>
																							<td>
																								<div className="itemside">
																									<div className="left">
																										<img src={item.productId.img} alt={item.productId.name} className="img-xs" />
																									</div>
																									<div className="info">{item.productId.name}</div>
																								</div>
																							</td>
																							<td>${item.productId.price}</td>
																							<td>{item.quantity}</td>
																							<td className="text-end">${item.productId.price * item.quantity}</td>
																						</tr>
																					))}
																					<tr>
																						<td colSpan="4">
																							<article className="float-right">
																								<dl className="dlist">
																									<dt>Grand total:</dt>
																									<dd>${(sumPrice(order)).toFixed(2)}</dd>
																								</dl>
																								<dl className="dlist">
																									<dt>Shipping cost:</dt>
																									<dd>${(order.amount) - (sumPrice(order)).toFixed(2)}</dd>
																								</dl>
																								<dl className="dlist">
																									<dt>Grand total:</dt>
																									<dd><b className="h5">${((order.amount)).toFixed(2)}</b></dd>
																								</dl>
																							</article>
																						</td>
																					</tr>
																				</tbody>
																			</table>
																		</div>
																	) : (
																		<div className="text-center">No Item Available</div>
																	)
															}

														</div>
													</div>
												</div>
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

export default EditOrder;