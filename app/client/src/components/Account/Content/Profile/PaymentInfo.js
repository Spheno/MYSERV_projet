import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SalesContent extends React.Component {
  render() {
    return (
      <form>
        <div className="p-8 bg-white border-gray-300 rounded-lg md:shadow md:border">
          <div className="flex items-center mb-4">
            <h2 className="mr-4 text-xl">Your Payment Information</h2>
            <FontAwesomeIcon icon="credit-card" size="2x" />
          </div>

          <div className="w-full">
            <label htmlFor="payment" className="block mb-2 text-sm">
              Credit Card
            </label>
            <div className="flex">
              <input
                type="text"
                className="flex-1 w-5/6 p-3 text-sm text-gray-900 bg-gray-200 rounded-l focus:outline-none"
                placeholder="Card Number"
              />
              <input
                type="text"
                className="inline-block w-1/6 p-3 text-sm text-gray-900 bg-gray-200 focus:outline-none"
                placeholder="MM / YY"
              />
              <input
                type="text"
                className="inline-block w-1/6 p-3 text-sm text-gray-900 bg-gray-200 rounded-r focus:outline-none"
                placeholder="CVC"
              />
            </div>

            <div className="mt-8">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="street"
              >
                Shipping Address{" "}
                <FontAwesomeIcon icon="map-marker-alt" size="1x" />
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
                id="street"
                name="street"
                type="text"
                placeholder="Street"
                aria-label="Street"
              />
            </div>
            <div className="mt-2">
              <label
                className="hidden block text-sm text-gray-600"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
                id="city"
                name="city"
                type="text"
                required=""
                placeholder="City"
                aria-label="City"
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
                  required=""
                  placeholder="Country"
                  aria-label="Country"
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
                  type="text"
                  required=""
                  placeholder="Zip"
                  aria-label="Zip code"
                />
              </div>
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
        </div>
      </form>
    );
  }
}
