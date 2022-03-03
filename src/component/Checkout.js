import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/Checkout.css";
import CartProduct from "./CartProduct";
import { useHistory } from "react-router";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { fetchUserCart } from "../Redux/action/action";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import db from "../firebase";


function Checkout() {
  const history = useHistory();

  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.cartAction);
  const { userID, username } = useSelector(state => state.authAction);
  const newfilterarr = cartdata.cart;

  console.log(newfilterarr);
  useEffect(async () => {
		// dispatch(fetchUserCart(userID));
    const cartProduct = [];
    const q = query(collection(db, "cart"), where("userID", "==", userID));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      }
      cartProduct.push(obj);
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
    });
    dispatch({type: "FETCH_USERCART", payload: cartProduct});
    // try {
    //   // setLoading(true);
    //   const products = await getDocs(collection(db, "cart"));
    //   // console.log(products);
    //   const productsList = [];
    //   products.forEach((doc) => {
    //     const obj = {
    //       id: doc.id,
    //       ...doc.data(),
    //     }
    //     productsList.push(obj);
    //     console.log(productsList);
    //     // setLoading(false);
    //   });
  
    //   // setProducts(productsList);
    // } catch (error) {
    //   console.log(error);
    //   // setLoading(false);
    // }   
	}, [userID, fetchUserCart]);

  //array for bulk product in state cart-array
  const cartproductarray = [
    ...newfilterarr
      .reduce((accum, val) => {
        let piece = `${val.title}`;
        // console.log(accum, piece);
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
      userID ? history.replace("/payment") : history.push("/login");
    }
  }

  
  //loop for fetch total price of all product
  var sub = 0;
  cartdata.cart.forEach((val) => {
    sub = sub + parseInt(val.price) * parseInt(val.count);
  });
  return (
    <>
    {/* {
console.log(newfilterarr)

    } */}
      <div className="chekcout_cart">
        <div className="chekcout_product">
          <h2 className="username">hello,{username || "guest"} </h2>
          <br />
          <hr />
          <h1 className="heading">Your order summery</h1>
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
