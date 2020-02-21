import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class SalesContent extends React.Component {
  render() {
    return (
      <form>
        <div className="p-8 bg-white border-gray-300 rounded-lg md:shadow md:border">
          <div className="flex items-center mb-4">
            <h2 className="mr-4 text-xl">Your Payment Information</h2><FontAwesomeIcon icon="credit-card" size="2x" />
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
