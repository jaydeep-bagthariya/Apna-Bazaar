import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/Checkout.css";
import CartProduct from "./CartProduct";
import { useHistory } from "react-router";
import { fetchUserCart } from "../Redux/action/action";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../firebase";
import Loader from './common/Loader';
import { toast } from 'react-toastify';

function Checkout() {
	const [loading, setLoading] = useState(true);
  const history = useHistory();

  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.cartAction);
  const { userID, username } = useSelector(state => state.authAction);
  const newfilterarr = cartdata.cart;

  const totalItems = cartdata.cart.reduce((accum, val) => {return accum + +val.count}, 0);

  console.log(newfilterarr);
  useEffect(() => {
    const ac = new AbortController();
		// dispatch(fetchUserCart(userID));
    const cartProduct = [];
    const fetchUserCartProducts =async () => {
      setLoading(true);
      const q = query(collection(db, "cart"), where("userID", "==", userID));
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        }
        cartProduct.push(obj);
      });
      setLoading(false);
    }
    fetchUserCartProducts();
    dispatch({type: "FETCH_USERCART", payload: cartProduct});
    return () => ac.abort();
	}, [userID, fetchUserCart]);


  //payment page validation
  function onWhichPage() {
    if (newfilterarr.length === 0) {
      toast.error("Please add some item in cart");
      history.push("/");
    } else {
      userID ? history.replace("/payment") : history.push("/login");
    }
  }

  
  //loop for fetch total price of all product
  var sub = 0;
  cartdata.cart.forEach((val) => {
    sub = sub + val.price * val.count;
  });
  sub = sub.toFixed(2);
  return (
    <>
      {loading && <Loader /> }
      <div className="chekcout_cart">
        <div className="chekcout_product">
          <h2 className="username">hello,{username || "guest"} </h2>
          <br />
          <hr />
          <h1 className="heading">{totalItems ? "Your cart products" : "No items found in your cart"}</h1>
          
            {newfilterarr.map((val, index) => {
              return (
                <CartProduct
                  key={index}
                  id={val.id}
                  count={val.count}
                  image={val.image}
                  title={val.title}
                  price={val.price}
                  rating={val.rating.rate}
                />
              );
            })}
        </div>
        <div className="checkout_price">
          <div className="cart_message">
            <h1>Your Bill</h1>
          </div>
          <div className="price_section">
            <h3 className="subtotal">
              Subtotal ({totalItems} items) :{" "}
              <span style={{ marginRight: "2px" }}>$</span>
              {sub}
            </h3>
            <h3 className="shipping_charge">
              Shipping Charge:<span style={{ marginRight: "2px" }}>$</span>5
            </h3>
            <hr />
            <h3 className="totalprice">
              Total Price: <span style={{ marginRight: "2px" }}>$</span>
              {sub + 5}
            </h3>
            <div className="input_div">
              <input type="checkbox" name="" id="input" />
              <label htmlFor="input">Contain Your Gift As Wrap</label>
            </div>
            <div className="btn_div">
              <button onClick={onWhichPage}> Place your order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
