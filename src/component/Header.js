import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signOut } from "@firebase/auth";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "../css/Header.css";



function Header() {
  const auth = getAuth();
  const history = useHistory();

  const dataarray = useSelector((state) => state.cartAction);
  const username = dataarray.username;

  
  window.onload=()=>{
    history.push('/')
  }

  
  //function for user login or signup for security 
  const signinOrSignup = () => {
    if (username) {
      const confirmlogout = window.confirm("are You sure for Logout?");
      if (confirmlogout) {
        signOut(auth).then(() => {
          history.replace("/");
        });
      }
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      <div className="Header">
        <Link to="/">
          <img
            src=" data:image/png;base64,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"
            className="Header_logo"
            alt="header-logo"
          />
        </Link>
        <div className="Header_Seachbar">
          <input type="text" className="Header_input" />
          <SearchIcon className="Search_logo" />
        </div>
        <div className="Header_nav">
          <div className="Header_nav_item" onClick={signinOrSignup}>
            <span className="nav_one">hello {username || "guest"} </span>
            <span className="nav_two">{username ? "sign out" : "sign in"}</span>
          </div>
          <Link to={username ? "/order" : "/login"}>
            <div className="Header_nav_item">
              <span className="nav_one">order</span>
              <span className="nav_two">& return</span>
            </div>
          </Link>
          <div className="Header_nav_item">
            <span className="nav_one">Your</span>
            <span className="nav_two">Prime</span>
          </div>
          <Link to="/checkout">
            <div className="Header_nav_cart">
              <ShoppingBasketIcon className="Header_CartIcon" />
              <span className="nav_orderCount nav_two">
                {dataarray.cart.length || 0}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
