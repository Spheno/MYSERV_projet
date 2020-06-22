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
    deliveryAddress,
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
        deliveryAddress,
        phoneNumber,
        currency,
        amount,
        source: orderID,
        email,
      },
      null,
      //window.location = "/success",
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
      deliveryAddress,
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

        onCancel={(data) => {
          alert("You canceled your purchase")
        }}

        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          return actions.order.capture().then((details) => {
            // Show a success message to your buyer
            alert("Transaction completed by " + details.payer.name.given_name);
            console.log(JSON.stringify(details.purchase_units[0].shipping.address))
            deliveryAddress = details.purchase_units[0].shipping.address;

            // Call server to save the transaction
            try {
              this.checkout(
                origin,
                amount,
                currency,
                cart,
                deliveryAddress, 
                phoneNumber,
                description,
                email,
                data.orderID
              );
            } catch (error) {
              console.log("paypal error", error);
            }
          });
        }}
      />
    );
  }
}
