import { useEffect } from "react";
import "./css/App.css";
import Header from "./component/Header";
import Home from "./component/Home";
import Login from "./component/Login";
import Payment from "./component/Payment";
import Orderpage from "./component/Orderpage";
import Checkout from "./component/Checkout";
import Footer from "./component/Footer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsername } from "./Redux/action/action";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
require("dotenv").config();

//load stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    //function for fetch user whom is login or register and alse store name and email in data-layer
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let rowname = user.email.split("@");
        dispatch(setUsername(rowname[0], user.email, user));
      } else {
        dispatch(setUsername(null, null));
      }
    });
  });
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/order">
            <Header />
            <Orderpage />
            <Footer />
          </Route>
          <Elements stripe={stripePromise}>
            <Route exact path="/payment" component={Payment} />
          </Elements>
        </Switch>
      </Router>
    </>
  );
}

export default App;
