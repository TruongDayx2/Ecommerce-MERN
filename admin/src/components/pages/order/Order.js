import {Link} from 'react-router-dom';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../../redux/actions/OrderActions";


const Order = (props) => {
	let { _id,userId, email, amount, isPaid, createdAt, status } = props.order;

	const orderDate = new Date(createdAt);
	// DD/MM/YYYY 
	const localOrderDate = orderDate.toLocaleDateString('en-GB', {
				  day: 'numeric', month: 'numeric', year: 'numeric'
				}).replace(/ /g, '-');



	
	const dispatch = useDispatch();

	  const deletehandler = (id) => {
	    if (window.confirm("Are you sure want to delete order?")) {
	      dispatch(deleteOrder(id));
	    }
	  };
	return(
		<>
		    <tr>
              <td>{userId.name}</td>
              <td>{userId.email}</td>
              <td>$ {amount}</td>
              <td>{isPaid ? "Yes" : "No" }</td>
              <td>{localOrderDate}</td>
              <td>{status}</td>
              <td><Link
	                to={`/order/edit/${_id}`}
	                className="text-success"
	                title="View"
	              >
	              	<i className="fa fa-eye"></i>
	              </Link>
	              <Link
	                to="#"
	                title="Delete"
	                onClick={() => deletehandler(_id)}	                
	              >
	              	<i className="fa fa-trash"></i>
	              </Link>
	           </td>
            </tr>
		</>
		)
}

export default Order;