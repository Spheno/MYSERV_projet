import React from "react";

import LoaderScreen from "../../../Loader/LoaderScreen";
import { confirmAlert } from "react-confirm-alert"; /* custom confirm pop up */
import AlertDeleteArticle from "../../../Alerts/AlertDeleteArticle";

import API from "../../../../utils/userAPI";

export default class AddressList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showAlert: false,
      phoneNumber: "",
      shippingAddress: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await API.getShippingAddress(this.props.phoneNumber);
      console.log("res", response);
      this.setState({
        loading: false,
        phoneNumber: this.props.phoneNumber,
        shippingAddress: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteAddress = async (phoneNumber) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            this.setState({ showAlert: true });
            try {
              const userRes = await API.deleteShippingAddress(phoneNumber);
              console.log("res remove adr", userRes);
            } catch (error) {
              console.log("Error delete adr", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => null,
        },
      ],
    });
  };

  closeAlert = () => {
    this.setState({ showAlert: false });
  };

  render() {
    let { loading, showAlert, phoneNumber, shippingAddress } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      if (!shippingAddress || shippingAddress.length === 0) {
        return (
          <div className="text-sm text-center">
            <p>
              Nothing here.... Add a new address where we can send you your
              purchases.
            </p>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col max-w-sm px-8 py-6 mx-auto bg-white rounded-lg shadow-lg">
            <AlertDeleteArticle
              showAlert={showAlert}
              closeAlert={this.closeAlert.bind(this)}
            />

            <div className="flex items-center justify-center">
              <button
                className="px-2 py-1 text-sm text-white bg-red-600 rounded"
                onClick={() => this.deleteAddress(phoneNumber)}
              >
                Delete
              </button>
            </div>
            <div className="mt-4">
              <p className="text-lg font-medium text-gray-700">
                {shippingAddress.street}, {shippingAddress.city}
              </p>
              <p className="text-lg font-medium text-gray-700">
                {shippingAddress.country}, {shippingAddress.zipcode}
              </p>
            </div>
          </div>
        );
      }
    }
  }
}
