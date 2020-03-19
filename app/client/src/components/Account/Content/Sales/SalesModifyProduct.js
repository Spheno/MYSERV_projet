import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import API from "../../../../utils/userAPI";
import LoaderScreen from "../../../Loader/LoaderScreen";

export default class SalesModifyProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      myProducts: []
    };
  }

  async componentDidMount() {
    try {
      const myProductsData = await API.getMyProducts(this.props.phoneNumber);
      this.setState({ loading: false, myProducts: myProductsData });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { loading, myProducts } = this.state;
    console.log(myProducts);

    if (!loading) {
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
                      Price
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Description
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Date
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {myProducts.map((product, index) => {
                    console.log(typeof product.uploadDate);
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {product.title}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {product.price}€
                          </div>
                          <div className="text-sm leading-5 text-gray-500">
                            {product.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {product.description || (
                              <p className="italic">None</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                          {product.tags}
                        </td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                          {product.uploadDate}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                          <button
                            className="px-2 m-2 text-gray-700 no-underline hover:text-red-600"
                            href="#top"
                          >
                            <span className="hidden">Update</span>
                            <FontAwesomeIcon icon="edit" />
                          </button>
                          <button
                            className="px-2 m-2 text-gray-700 no-underline hover:text-red-600"
                            href="#top"
                          >
                            <span className="hidden">Delete</span>
                            <FontAwesomeIcon icon="trash-alt" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      return <LoaderScreen />;
    }
  }
}
