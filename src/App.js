import { useEffect } from "react";
import "./css/App.css";
import Login from "./component/Login";
import Layout from "./component/Layout";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

import PaymentHelper from "./component/PaymentHelper";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require("dotenv").config();

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();

  const { username, userID, usermail } = useSelector(state => state.authAction);
  console.log(username, userID, usermail);
  
  useEffect(() => {
    //function for fetch user whom is login or register and alse store name and email in data-layer
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        dispatch({type: "AUTH_SUCCESS", payload: user});
      }
    });
    return unsubscribe;
  },[]);
  
  return (
    <>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
            <Route exact path="/payment" component={PaymentHelper} />
          <Route path="/" component={(Layout)} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
