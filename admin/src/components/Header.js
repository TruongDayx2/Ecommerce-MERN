import { Link, useHistory } from 'react-router-dom';
import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import logo from "../images/logo.jpg";
import minilogo from "../images/logo-mini.svg";
import profilePic from "../images/faces/face8.jpg";


const Header = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const { userLogin: { userInfo: { data } } } = useSelector((state) => state);

  let today = new Date();
  let curHr = today.getHours();
  let userMessage = '';

  if (curHr < 12) {
    userMessage = 'Good Morning';
  } else if (curHr < 18) {
    userMessage = 'Good Afternoon';
  } else {
    userMessage = 'Good Evening';
  }

  return (
    <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
        <div className="me-3">

        </div>
        <div>
          <Link className="navbar-brand brand-logo" to="/dashboard">
            <img src={logo} alt="logo" />
          </Link>
          <Link className="navbar-brand brand-logo-mini" to="/dashboard">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-top">
        <ul className="navbar-nav">
          <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
            <h1 className="welcome-text">{userMessage}, <span className="text-black fw-bold">{data && data[0].name } {data[0].lastname}</span></h1>
            <h3 className="welcome-sub-text">Your performance summary this week </h3>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown d-none d-lg-block">




          </li>


          <li className="nav-item dropdown d-none d-lg-block user-dropdown">
            <a className="nav-link" id="UserDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="profile-text">Hello, {data[0].name} {data[0].lastname}           .</span>
              <img className="img-xs rounded-circle" src={data[0].img} alt="Profile image" /> </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
              <div className="dropdown-header text-center">
                <img className="img-xs rounded-circle" src={data[0].img} alt="Profile image" />
                <p className="mb-1 mt-3 font-weight-semibold">{data[0].name} {data[0].lastname}</p>
                <p className="fw-light text-muted mb-0">{data[0].email}</p>


              </div>

              <Link className="dropdown-item" to={`users/edit/${data[0]._id}`}><i className="dropdown-item-icon mdi mdi-account-outline text-primary me-2" />My Profile</Link>
              <Link className="dropdown-item" to="#" onClick={logoutHandler}><i className="dropdown-item-icon mdi mdi-power text-primary me-2" />Log Out</Link>
            </div>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="offcanvas">
          <span className="mdi mdi-menu" />
        </button>
      </div>
    </nav>
  )

}

export default Header;