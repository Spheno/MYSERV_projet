import React from "react";
import LoaderScreen from "../../../Loader/LoaderScreen";

export default class SalesTableBuyings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      products: [],
    };
  }

  componentDidMount() {
    console.log("props", this.props);

    this.props.orders.map((order) => {
      return order.cart.map((productID) => {
        console.log("id", productID);
        return this.setState((state) => {
          const products = [...state.products, productID];
          return { products };
        });
      });
    });

    this.setState({ loading: false });
  }

  render() {
    let { loading, products } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      console.log("products", products);
      return (
        <div className="flex flex-col">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Product
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Category
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Price
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Date
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            Playstation 5
                          </div>
                          <div className="text-sm leading-5 text-gray-500">
                            from Albert
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        150€
                      </div>
                      <div className="text-sm leading-5 text-gray-500">
                        Gaming
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">1</div>
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      Today
                    </td>
                    <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                      <a
                        href="#top"
                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                      >
                        More...
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  }
}
