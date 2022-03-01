import React from "react";
import "../css/CartProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  removeSingleItem,
  addSingleItem,
} from "../Redux/action/action";
import { doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import db from "../firebase";

function CartProduct({
  id,
  count,
  image,
  price,
  title,
  rating,
  disablebtn,
}) {

  const dispatch = useDispatch();
  const { userID } = useSelector(state => state.authAction)
  const key = id.toString().concat(userID);

  const addOneItem = async () => {
    let count = 0;
      const docRef = doc(db, "cart", key);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().count);
        count = docSnap.data().count;
        const cartRef = doc(db, 'cart', key);
        setDoc(cartRef, { count: count+1 }, { merge: true });
        dispatch(addSingleItem(id))
      }
      else {
        console.log("Are yaar ab kya ho gaya !!!");
      }
  }

  const removeOneItem = async () => {
    let count = 0;
    const docRef = doc(db, "cart", key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().count);
      count = docSnap.data().count;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    if(count == 1) {
      removeAllItems();
    }
    else {
      const cartRef = doc(db, 'cart', key);
      setDoc(cartRef, { count: count-1 }, { merge: true });
      dispatch(removeSingleItem(id));
    }
  }
  const removeAllItems = async () => { 
    // const key = id.toString().concat(userID);
    await deleteDoc(doc(db, "cart", key))
    .then(() => {console.log("item remove successfully");})
    .catch(err => {console.log("Error ", err.message);})
    dispatch(removeFromCart(id));
  }
  return (
    <>
      <div className="checkout_productdiv">
        <img src={image} alt="product" className="Cartproduct_img" />
        <div className="Cartproduct_detail">
          <div className="Cartproduct_info">
            <div className="Cartproduct_name">{title}</div>
            <div className="Cartproduct_price">
              <span style={{ marginRight: "2px" }}>$</span>
              {price}
            </div>

            <div className="Cartproduct_rating" style={{display:'flex'}}>
            
              {Array(Math.round(rating)).fill().map((_, i) => {
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
                  <button onClick={() =>addOneItem()}>
                    +
                  </button>
                  <input type="text" value={count} readOnly />
                  <button onClick={() => removeOneItem()}>
                    -
                  </button>
                </div>
              )}
            </div>
            <div className="Cartproduct_btn">
              {!disablebtn && (
                <button 
                onClick={() => removeAllItems()}
                >
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
