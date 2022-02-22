import React from "react";
import "../css/CartProduct.css";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  removeSingleItem,
  addSingleItem,
} from "../Redux/action/action";

function CartProduct({
  id,
  count,
  imageLink,
  price,
  pname,
  detail,
  rating,
  disablebtn,
}) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="checkout_productdiv">
        <img src={imageLink} alt="product" className="Cartproduct_img" />
        <div className="Cartproduct_detail">
          <div className="Cartproduct_info">
            <div className="Cartproduct_name">{pname}</div>
            <div className="Cartproduct_fullinfo">{detail}</div>
            <div className="Cartproduct_price">
              <span style={{ marginRight: "2px" }}>₹</span>
              {price}
            </div>

            <div className="Cartproduct_rating" style={{display:'flex'}}>
            
              {Array(rating).fill().map((_, i) => {
                  return (
                    <p key={i} style={{ color: "yellow" }}>
                      🌟  
                    </p>
                  );
                })}
            </div>
          </div>
          <div className="Cartproduct_info2">
            <div className="Cartproduct_piece">
              <p> total item:{count}</p>
              {!disablebtn && (
                <div className="Cartproduct_quantity">
                  <button
                    onClick={() => {
                      dispatch(
                        addSingleItem({
                          id,
                          imageLink,
                          pname,
                          detail,
                          price,
                          rating,
                        })
                      );
                    }}
                  >
                    +
                  </button>
                  <input type="text" value={count} readOnly />
                  <button onClick={() => dispatch(removeSingleItem(id))}>
                    -
                  </button>
                </div>
              )}
            </div>
            <div className="Cartproduct_btn">
              {!disablebtn && (
                <button onClick={() => dispatch(removeFromCart(id))}>
                  Remove from Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
