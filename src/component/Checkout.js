import React from "react";
import { useSelector } from "react-redux";
import "../css/Checkout.css";
import CartProduct from "./CartProduct";
import { useHistory } from "react-router";


function Checkout() {
  const history = useHistory();

  const cartdata = useSelector((state) => state.cartAction);
  const newfilterarr = cartdata.cart;

  //array for bulk product in state cart-array
  const cartproductarray = [
    ...newfilterarr
      .reduce((accum, val) => {
        let piece = `${val.pname}`;
        if (!accum.has(piece)) {
          accum.set(piece, { ...val, count: 1 });
        } else {
          accum.get(piece).count++;
        }
        return accum;
      }, new Map())
      .values(),
  ];


  //payment page validation
  function onWhichPage() {
    if (newfilterarr.length === 0) {
      alert("please add some item in cart");
      history.push("/");
    } else {
      cartdata.username ? history.replace("/payment") : history.push("/login");
    }
  }

  
  //loop for fetch total price of all product
  var sub = 0;
  cartdata.cart.forEach((val) => {
    sub = sub + parseInt(val.price);
  });
  return (
    <>
    {
console.log(newfilterarr)

    }
      <div className="chekcout_cart">
        <div className="chekcout_product">
          <h2 className="username">hello,{cartdata.username || "guest"} </h2>
          <br />
          <hr />
          <h1 className="heading">Your order summery</h1>
          {cartproductarray.map((val, index) => {
            return (
              <CartProduct
                key={index}
                id={val.id}
                count={val.count}
                imageLink={val.imageLink}
                detail={val.detail}
                pname={val.pname}
                price={val.price}
                rating={val.rating}
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
              Subtotal ({cartdata.cart.length} items) :{" "}
              <span style={{ marginRight: "2px" }}>₹</span>
              {sub}
            </h3>
            <h3 className="shipping_charge">
              Shipping Charge:<span style={{ marginRight: "2px" }}>₹</span>150
            </h3>
            <hr />
            <h3 className="totalprice">
              Total Price: <span style={{ marginRight: "2px" }}>₹</span>
              {sub + 150}
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
