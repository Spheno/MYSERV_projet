import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoaderScreen from "../../../Loader/LoaderScreen";
import SalesTable from "./SalesTableBuyings";

import orderAPI from "../../../../utils/orderAPI";

export default class SalesBuyings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      total: 0,
      devise: "",
      nbProducts: 0,
      orders: [],
    };
  }

  async componentDidMount() {
    const phoneNumber = JSON.parse(localStorage.getItem("user")).phoneNumber;
    try {
      const orders = await orderAPI.getMyOrders(phoneNumber);
      
      this.setState({
        orders: orders,
        nbProducts: orders.nbProducts,
        total: orders.totalAmount,
        devise: orders.currency,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    let { loading, total, devise, nbProducts, orders } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
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
                      <h3 className="text-3xl">
                        {total}
                        {devise}
                      </h3>
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
                      <h3 className="text-3xl">{nbProducts} </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-8 border-b-2 border-gray-400" />

          <SalesTable orders={orders.orders} />
        </div>
      );
    }
  }
}
