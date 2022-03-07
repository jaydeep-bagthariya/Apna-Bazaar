import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signOut } from "@firebase/auth";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "../css/Header.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



function Header(props) {
  const auth = getAuth();
  const history = useHistory();
  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.cartAction);
  const {username, userID } = useSelector((state) => state.authAction);;

  const totalItems = cartdata.cart.reduce((accum, val) => {return accum + +val.count}, 0);

  const [selectedCategory, setSelectedCategory] = useState("");

  const selectedCategoryHandler = (e) => {
    setSelectedCategory(e.target.value);
    props.onItemCategoryChange(e.target.value);
  }
  
  window.onload=()=>{
    history.push('/')
  }

  
  //function for user login or signup for security 
  const signinOrSignup = () => {
    if (userID) {
      confirmAlert({
        title: 'Confirm to logout',
        message: 'Are you sure to logout ?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              signOut(auth).then(() => {
                dispatch({type: 'SIGN_OUT'})
                history.replace("/");
                window.location.reload();
              });
            }
          },
          {
            label: 'No',
          }
        ]
      });
      // const confirmlogout = window.confirm("are You sure for Logout?");
      // if (confirmlogout) {
      //   signOut(auth).then(() => {
      //     console.log("out");
      //     dispatch({type: 'SIGN_OUT'})
      //     history.replace("/");
      //     window.location.reload();
      //   });
      // }
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      <div className="Header">
        <Link to="/">
          <div className="Header_logo">
            <h5>APNA</h5>
            <h2>BAZAAR</h2>
          </div>         
        </Link>
        <div className="Header_Seachbar">
          {/* <div className="header_select_div"> */}
            <select id="cars" name="cars" className="header_select" onChange={selectedCategoryHandler} value={selectedCategory}>
              <option value="all">All</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
            </select>
          {/* </div> */}
          <input type="text" className="Header_input" />
          <SearchIcon className="Search_logo" />
        </div>
        <div className="Header_nav">
          <div className="Header_nav_item" onClick={signinOrSignup}>
            <span className="nav_one">hello {username || "guest"} </span>
            <span className="nav_two">{username ? "sign out" : "sign in"}</span>
          </div>
          <Link to={username ? "/order" : "/order"}>
            <div className="Header_nav_item">
              <span className="nav_one">order</span>
              <span className="nav_two">& return</span>
            </div>
          </Link>
          <Link to="/checkout">
            <div className="Header_nav_cart">
              <ShoppingBasketIcon className="Header_CartIcon" />
              <span className="nav_orderCount nav_two">
                {totalItems || 0}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
