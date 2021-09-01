const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const stripe = require("stripe")(
  "sk_test_51JCOY7AQAlFbdgBeHiqNCujKlEGUPMwD9WoDFHIB14BQhM3Z2ejIDvq6gT1pI3roZaIpv6HbnS8PLhBlR5GuTJcH0091Zb7Zfw"
);

// - API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/payments/create", async (req, res) => {
  const { total } = req.query;

  console.log("Payment Request Received :>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  console.log(paymentIntent);
  // OK - Created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);