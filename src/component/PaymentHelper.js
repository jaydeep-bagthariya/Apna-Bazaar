import React from 'react'
import { Switch, Route } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from './Payment';

//load stripe
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const stripePromise = loadStripe('pk_test_51KYlZRSA5Q9jJFaaowboppsW3v9MO9qigCsY5EYngILWlZPeYaq6pia2AMTIT8VCv3L4P8SogKNTcPhP4E1yrV5C00bTmkbMe9');

const PaymentHelper = () => {
  return (
    <Switch>
      <Elements stripe={stripePromise}>
        <Route exact path="/payment" component={Payment} />
      </Elements>
    </Switch>
  )
}

export default PaymentHelper