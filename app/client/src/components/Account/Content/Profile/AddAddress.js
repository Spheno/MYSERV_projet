import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";

import API from "../../../../utils/userAPI";

export default class AddAddress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: "",
      street: "",
      city: "",
      country: "",
      zipcode: "",
    };

    this.handleStreetChange = this.handleStreetChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.setState({ phoneNumber: this.props.phoneNumber });
  }

  submit = async (e, data) => {
    e.preventDefault();

    console.log("data", data);

    try {
      const response = await API.addShippingAddress(data);
      if (response) {
        toast.success("upload success");
        console.log("Response", response);
      }
    } catch (error) {
      toast.error("upload fail", error);
      if (error.response) {
        console.log(error.response.data);
        console.log("Status code: ", error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error ", error.message);
      }
    }
  };

  handleStreetChange = (e) => {
    this.setState({ street: e.target.value });
  };
  handleCityChange = (e) => {
    this.setState({ city: e.target.value });
  };
  handleCountryChange = (e) => {
    this.setState({ country: e.target.value });
  };
  handleZipCodeChange = (e) => {
    this.setState({ zipcode: e.target.value });
  };

  render() {
    let { phoneNumber, street, city, country, zipcode } = this.state;

    return (
      <form
        onSubmit={(e) =>
          this.submit(e, { phoneNumber, street, city, country, zipcode })
        }
      >
        <div className="form-group">
          <ToastContainer />
        </div>

        <div>
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            htmlFor="street"
          >
            Shipping Address <FontAwesomeIcon icon="map-marker-alt" size="1x" />
          </label>
          <input
            className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
            id="street"
            name="street"
            type="text"
            placeholder="Street"
            aria-label="Street"
            value={street}
            onChange={this.handleStreetChange}
            required
          />
        </div>
        <div className="mt-2">
          <label className="hidden block text-sm text-gray-600" htmlFor="city">
            City
          </label>
          <input
            className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
            id="city"
            name="city"
            type="text"
            required
            placeholder="City"
            aria-label="City"
            value={city}
            onChange={this.handleCityChange}
          />
        </div>
        <div className="flex mb-2">
          <div className="inline-block w-1/2 pr-1 mt-2">
            <label
              className="hidden block text-sm text-gray-600"
              htmlFor="country"
            >
              Country
            </label>
            <input
              className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
              id="country"
              name="country"
              type="text"
              required
              placeholder="Country"
              aria-label="Country"
              value={country}
              onChange={this.handleCountryChange}
            />
          </div>
          <div className="inline-block w-1/2 pl-1 mt-2">
            <label
              className="hidden block text-sm text-gray-600"
              htmlFor="zipCode"
            >
              Zip
            </label>
            <input
              className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
              id="zipCode"
              name="zipCode"
              type="number"
              max={99999}
              required
              placeholder="Zip"
              aria-label="Zip code"
              value={zipcode}
              onChange={this.handleZipCodeChange}
            />
          </div>
        </div>

        <div className="my-6 text-center">
          <button
            type="submit"
            className="w-40 py-3 my-1 text-center text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}
