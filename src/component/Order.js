import React from "react";
import moment from "moment";
import "../css/Order.css";

import CartProduct from "./CartProduct";


function Order({ val }) {
  console.log("value", val);
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
              image={val.image}
              description={val.description}
              title={val.title}
              price={val.price}
              rating={val.rating.rate}
              disablebtn
            />
          );
        })}
      </div>
      <h4>
        {`Amount: `}  
         <span style={{ marginRight: "2px" }}>$</span>
        {val.userdata.amount + 5}
      </h4>
    </div>
  );
}

export default Order;
