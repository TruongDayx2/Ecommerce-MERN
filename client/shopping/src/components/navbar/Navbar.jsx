import { Badge } from "@material-ui/core";
import { AccountCircleOutlined, Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/apiCall";
import Announcement from "./Announcement";
import "./navbar.css";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [account, setAccount] = useState(false);

  const handleClick = (e) => {
    localStorage.removeItem("persist:root");
    logout(dispatch);
    setAccount(false);
    navigate("../login");
  };

  return (
    <>
      <Announcement />
      <div className="nb_container">
        <div className="nb_wrapper">
          <div className="nb_left">
            <div className="nb_language">EN</div>
            <div className="nb_search">
              <input type="text" className="nb_input" placeholder="Search" />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </div>
          </div>
          <div className="nb_center">
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              <h1 className="nb_logo">77Shop</h1>
            </Link>
          </div>
          <div className="nb_right">
            {!user && (
              <>
                <Link to="/register" className="nb_link">
                  <div className="nb_menuItem">REGISTER</div>
                </Link>
                <Link to="/login" className="nb_link">
                  <div className="nb_menuItem">SIGN IN</div>
                </Link>
              </>
            )}
            {user && (
              <>
                <Link to="/cart">
                  <div className="nb_menuItem">
                    <Badge badgeContent={quantity} color="primary" overlap="rectangular">
                      <ShoppingCartOutlined />
                    </Badge>
                  </div>
                </Link>
                <div className="nb_menuItem" onClick={() => setAccount(!account)}>
                  <Badge badgeContent={quantity} color="primary" overlap="rectangular">
                    <AccountCircleOutlined />
                  </Badge>
                </div>
              </>
            )}
          </div>
        </div>
        {account && (
          <div className="nb_account">
            <div className="nb_accItem" style={{ display: "flex", flexDirection: "column" }}>
              <span className="nb_rightText">
                <b>
                  {user.data[0].name} {user.data[0].lastname}
                </b>
              </span>
              <span>{user.data[0].email}</span>
            </div>
            <Link to="/setting" style={{ textDecoration: "none", color: "black" }}>
              <div className="nb_accItem">
                <span className="nb_rightText">
                  <b>Setting</b>
                </span>
              </div>
            </Link>

            <Link to="/order" style={{ textDecoration: "none", color: "black" }}>
              <div className="nb_accItem">
                <span className="nb_rightText">
                  <b>Orders</b>
                </span>
              </div>
            </Link>
            <div className="nb_accItem" onClick={handleClick}>
              <span className="nb_rightText">
                <b>Log out</b>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
