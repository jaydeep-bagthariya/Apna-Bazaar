import { useEffect } from "react";
import "./css/App.css";
import Header from "./component/Header";
import Home from "./component/Home";
import Login from "./component/Login";
import Payment from "./component/Payment";
import Orderpage from "./component/Orderpage";
import DetailPage from './component/DetailPage';
import Checkout from "./component/Checkout";
import Footer from "./component/Footer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "./Redux/auth/action";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
require("dotenv").config();

//load stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();

  const { username, userID, token, usermail, user } = useSelector(state => state.authAction);
  console.log(username, userID, usermail);
  
  useEffect(() => {
    //function for fetch user whom is login or register and alse store name and email in data-layer
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        let rowname = user.email.split("@");
        // dispatch(setUsername(rowname[0], user.email, user.uid));
        dispatch({type: "AUTH_SUCCESS", payload: user});
      } 
      // else {
      //   // dispatch(setUsername(null, null, null));
      //   console.log("okay");
      // }
    });
    return unsubscribe;
  },[]);
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
            {/* <Header /> */}
            <Login />
            {/* <Footer /> */}
          </Route>
          <Route exact path="/detail/:id">
            <Header />
            <DetailPage />
            <Footer />
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
