const express = require("express")
const app = express()
require('dotenv').config()
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY)
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors())

 
app.post("/payments/create", cors(), async (request, response) => {
  const total = request.query.total;

  console.log("paymentsuceessful", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });
  console.log("cs", paymentIntent.client_secret);
  response.json({
    message: "Payment successful",
    success: true
  })
  // response.status(201).send({
  //   clientSecret: paymentIntent.client_secret,
  // });
});



app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000")
})