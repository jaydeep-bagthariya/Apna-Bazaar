require("dotenv").config();
const express = require("express");
const cors = require("cors");

//stripe secret key
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

const app = express();


//json parseer and cors
app.use(cors({ origin: true }));
app.use(express.json());


//for fun
app.get("/", (request, response) => {
  response.status(200).send("Hello world");
});


//post request for when user change in their product cart and send client secret
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("paymentsuceessful", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });
  console.log("cs", paymentIntent.client_secret);
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.listen(4000, () => {
  console.log("server is running", process.env.REACT_APP_STRIPE_SECRET_KEY);
});
