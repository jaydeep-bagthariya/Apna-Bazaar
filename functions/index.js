const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request } = require("express");
const stripe = require("stripe")
('sk_test_51KYlZRSA5Q9jJFaaRCAOVUFXeXtq7nfct1YDGQ6I8d1kwtvEpXUZ6TLJXIfzvVDOlAvTOlEylAbZi2pyhr8gPqxq00JXlsEF9Z')

const app = express();


//json parseer and cors
app.use(cors({ origin: true }));
app.use(express.json());

//for fun
app.get("/", (request, response) => {
  response.status(200).send("Hello world");
});

app.post('/payments/create', async (request, response) => {
  const total = request.query.total;

  console.log("paymentsuceessful", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
})

exports.api = functions.https.onRequest(app)


// http://localhost:5001/e-commerce-web-app-dc26f/us-central1/api

