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
import { doc, setDoc, collection } from "firebase/firestore";

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
  const user = cartdata.user;

  //array for bulk product in state cart-array
  const cartproductarray = [
    ...cartdata.cart
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

  //loop for fetch total price of all product
  var sum = 0;
  cartdata.cart.forEach((val) => {
    sum = sum + parseInt(val.price);
  });

  //state for strict payment button which is click only once
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);

  //state for assign error and client secret
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(true);

  //hook for when user change in cart then post method is execute
  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `http://localhost:4000/payments/create?total=${(sum + 150) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    fetchClientSecret();
    console.log("clientsecret", clientSecret);
  }, [cartdata.cart]);

  //payment button function
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    // make confirm payment with client secret
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //store order data in cloud storage(firestore)
        const userRef = collection(db, "user");
        const idRef = doc(userRef, `${user.uid}`);
        const orders = collection(idRef, "orders");
        const instanceRef = doc(orders, `${paymentIntent.id}`);
        setDoc(instanceRef, {
          cart: cartproductarray,
          amount: sum,
          created: paymentIntent.created,
        });

        //update state for payment button
        setSucceeded(true);
        setProcessing(false);
        setError(null);

        //redirect to order when order and payment is confirmed
        history.replace("/order");

        //empty state cart array
        dispatch(emptyCart());
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
            CheckOut <Link to="/checkout">{cartdata.cart.length} items </Link>
          </h1>

          <div className="payment_section">
            <div className="payment_title">
              <h3>Your Address</h3>
            </div>
            <div className="payment_address">
              <p>{cartdata.username}</p>
              <p>{cartdata.usermail}</p>
              <p>123 street,dream city</p>
              <p>Paradise</p>
            </div>
          </div>

          <div className="payment_section">
            <div className="payment_title">
              <h3>Your Item</h3>
            </div>
            <div className="payment_items">
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
                  please type 424242424.... ,do not enter real cardNumber
                </small>

                <CardElement onChange={handleChange} className="card_element" />

                <div className="payment_totalPrice">
                  <h3>
                    Order Total: <span style={{ marginRight: "2px" }}>₹</span>
                    {sum + 150}
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
