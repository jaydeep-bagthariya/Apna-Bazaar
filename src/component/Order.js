import React from "react";
import moment from "moment";
import "../css/Order.css";

import CartProduct from "./CartProduct";


function Order({ val }) {

  return (
    <div className="order_detail">
      <p>
        id: <small>{val.userid}</small>
      </p>
      <h3>Order</h3>
      <span>
        {moment.unix(val.userdata.created).format("MMMM Do YYYY,h:mma")}
      </span>
      <div className="order_cart_detail">
        {val.userdata.cart.map((val, index) => {
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
              disablebtn
            />
          );
        })}
      </div>
      <h4>
        Amount: 
         <span style={{ marginRight: "2px" }}>₹</span>
        {val.userdata.amount}
      </h4>
    </div>
  );
}

export default Order;
