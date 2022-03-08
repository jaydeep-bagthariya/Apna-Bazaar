import React, { useState } from "react";
import "../css/Payment.css";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "./CartProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import axios from "axios";
import { emptyCart } from "../Redux/action/action";
import db from "../firebase";
import { doc, setDoc, collection, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';


function Payment() {
  const dispatch = useDispatch();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  //function for security of payment page
  window.onload = () => {
    history.push("/");
  };

  const cartdata = useSelector((state) => state.cartAction);
  const user = useSelector((state) => state.authAction);

  const totalItems = cartdata.cart.reduce((accum, val) => {return accum + +val.count}, 0);

  //loop for fetch total price of all product
  var sum = 0;
  cartdata.cart.forEach((val) => {
    sum = sum + val.price * val.count;
  });
  // console.log('SUMMM', sum, (sum + 5) * 100 * 75);
  sum += 5;
  sum = sum.toFixed(2);
  // console.log("SUM", sum, sum * 100 * 75);


  //state for strict payment button which is click only once
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);

  //state for assign error and client secret
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(true);

  //hook for when user change in cart then post method is execute
  useEffect(() => {
    const ac = new AbortController();
    const fetchClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `https://using-for-stripe.herokuapp.com/payments/create?total=${parseInt(sum * 100 * 75)}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    
    fetchClientSecret();
    return () => ac.abort();
  }, [cartdata.cart]);
  
  console.log("clientsecret", clientSecret);

  const deleteCartItem = async(id) => {
    const key = id.toString().concat(user.userID);
    await deleteDoc(doc(db, "cart", key))
    .then(() => {
      // console.log("item remove successfully");
    })
    .catch(err => {
      // console.log("Error ", err.message);
    })
  }

  const emptyAllCartItems = () => {
    cartdata.cart.map((item) => {
      deleteCartItem(item.id);
    })
    dispatch(emptyCart());
  }
  //payment button function
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    // make confirm payment with client secret
    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // store order data in cloud storage(firestore)
        const userRef = collection(db, "user");
        const idRef = doc(userRef, `${user.userID}`);
        const orders = collection(idRef, "orders");
        const instanceRef = doc(orders, `${paymentIntent.id}`);
        setDoc(instanceRef, {
          cart: cartdata.cart,
          amount: sum,
          created: paymentIntent.created,
        });
        
        //update state for payment button
        setSucceeded(true);
        setProcessing(false);
        setError(null);
        toast.success("Your order placed successfully");
        
        history.replace("/order");

        //empty state cart array
        emptyAllCartItems();
        // dispatch(emptyCart());
      });
  };

  const handleChange = (event) => {
    //update state for payment button
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
    if (event.error) {
      setDisabled(true);
    }
  };
  return (
    <>
      <div className="payment">
        <div className="payment_container">
          <h1>
            CheckOut <Link to="/checkout">{totalItems} items </Link>
          </h1>

          <div className="payment_section">
            <div className="payment_title">
              <h3>Your Address</h3>
            </div>
            <div className="payment_address">
              <p>{user.username}</p>
              <p>{user.usermail}</p>
              <p>123 street,dream city</p>
              <p>Paradise</p>
            </div>
          </div>

          <div className="payment_section">
            <div className="payment_title">
              <h3>Your Item</h3>
            </div>
            <div className="payment_items">
              {cartdata.cart.map((val, index) => {
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
          </div>
          <div className="payment_section3">
            <div className="payment_title">
              <h3>Payment Here</h3>
            </div>
            <div className="payment_details">
              <form onSubmit={handleSubmit}>
                <small className="warning">
                  Please type 424242424.... do not enter real card number
                </small>

                <CardElement onChange={handleChange} className="card_element" />

                <div className="payment_totalPrice">
                  <h3>
                    Order Total: <span style={{ marginRight: "2px" }}>$</span>
                    {sum}
                  </h3>

                  <button
                    disabled={processing || disabled || succeeded}
                    className="payment_button"
                  >
                    <span>
                      {processing ? <p>processing</p> : "Place Order & Pay"}
                    </span>
                  </button>
                </div>
                {Error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
