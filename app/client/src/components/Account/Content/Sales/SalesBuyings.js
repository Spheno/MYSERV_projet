import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SalesTable from "./SalesTable";

export default class SalesBuyings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 153,
      devise: "€",
      nbProducts: 2,
      products: []
    };
  }

  render() {
    return (
      <div className="container mx-auto">
        <div className="w-full px-4 mb-8 leading-normal text-gray-800 md:px-0 md:mt-8">
          <div className="flex flex-wrap">
            <div className="w-full p-3 md:w-1/2">
              <div className="p-2 bg-white border rounded shadow">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="p-3 text-white bg-green-700 rounded">
                      <FontAwesomeIcon icon="wallet" size="2x" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="font-bold text-gray-600 uppercase">
                      Expenses
                    </h5>
                    <h3 className="text-3xl">{this.state.total}{this.state.devise}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-3 md:w-1/2">
              <div className="p-2 bg-white border rounded shadow">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="p-3 bg-orange-600 rounded">
                      <FontAwesomeIcon icon="list-ol" size="2x" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="font-bold text-gray-600 uppercase">
                      Products
                    </h5>
                    <h3 className="text-3xl">{this.state.nbProducts} </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-b-2 border-gray-400" />

        <SalesTable />
      </div>
    );
  }
}
