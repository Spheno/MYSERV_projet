import React from "react";

import StripeCheckout from "react-stripe-checkout";

import userAPI from "../../../../utils/userAPI";

const CURRENCY = "USD";

const fromDollarToCent = (amount) => parseInt(amount * 100);

const successPayment = (data) => {
  alert("Payment Successful");
  window.location = '/success'
};

const errorPayment = (data) => {
  alert("Payment Error" + data);
};

const onToken = (amount, cart, phoneNumber, description, email) => (token) => {
  userAPI.stripeCheckout(
    {
      description,
      cart,
      phoneNumber,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount),
      email
    },
    successPayment,
    errorPayment
  );}

const Checkout = ({ name, description, amount, cart, phoneNumber, email }) => (
  <StripeCheckout
    name={name}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, cart, phoneNumber, description, email)}
    currency={CURRENCY}
    stripeKey="pk_test_A3OHUxrkejChHEE95h9lNpf800BiTwI25E"
  />
);

export default Checkout;
