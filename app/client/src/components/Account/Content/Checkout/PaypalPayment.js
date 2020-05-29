import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

import userAPI from "../../../../utils/userAPI";

export default class PaypalPayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: "paypal",
      amount: 0,
      description: "",
      cart: [],
      phoneNumber: "",
      email: "",
      currency: "USD",
    };

    this.checkout = this.checkout.bind(this);
  }

  componentDidMount() {
    this.setState({
      amount: this.props.amount,
      description: this.props.description,
      cart: this.props.cart,
      phoneNumber: this.props.phoneNumber,
      email: this.props.email,
    });
  }

  checkout = (
    origin,
    amount,
    currency,
    cart,
    phoneNumber,
    description,
    email,
    orderID
  ) => {
    const response = userAPI.checkout(
      {
        origin,
        description,
        cart,
        phoneNumber,
        currency,
        amount,
        source: orderID,
        email,
      },
      alert('GG'),
      alert("Unlucky")
    );

    console.log("response", response);
  };

  render() {
    let {
      origin,
      amount,
      currency,
      cart,
      phoneNumber,
      description,
      email,
    } = this.state;

    return (
      <PayPalButton
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          return actions.order.capture().then((details) => {
            // Show a success message to your buyer
            alert("Transaction completed by " + details.payer.name.given_name);

            // Call server to save the transaction
            try {
              const response = this.checkout(
                origin,
                amount,
                currency,
                cart,
                phoneNumber,
                description,
                email,
                data.orderID
              );

              console.log("res", response);
            } catch (error) {
              console.log("paypal error", error);
            }
          });
        }}
      />
    );
  }
}
