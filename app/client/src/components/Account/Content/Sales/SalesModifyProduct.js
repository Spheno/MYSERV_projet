import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import API from "../../../../utils/userAPI";
import LoaderScreen from "../../../Loader/LoaderScreen";
import Quote from "../../../Quote";
import ReadableDate from "../../../Date/ReadableDate";

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
    let filteredTags = [];

    console.log(myProducts);

    if (!loading) {
      if (myProducts.length === 0) {
        return (
          <div>
            <h1 className="mb-8 text-3xl font-thin tracking-wide text-center">
              Quickly add a product by clicking on the tab 'Add a product'
            </h1>

            <Quote
              name="The Godfather (1972)"
              quote="I'm going to make him an offer he can't refuse."
            />
          </div>
        );
      } else {
        return (
          <div className="flex flex-col">
            <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                        Product
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                        Price
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                        Description
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                        Tags
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                        Date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                        Pictures
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {myProducts.map((product, index) => {
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
                            <div className="text-sm leading-5 text-gray-900">
                              {
                                (filteredTags = product.tags.filter(function(
                                  tag
                                ) {
                                  return tag !== "";
                                }))
                              }
                              {filteredTags.length > 0 ? (
                                filteredTags
                              ) : (
                                <p className="italic">None</p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              <ReadableDate date={product.uploadDate} />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              {product && product.pictures.length > 0
                                ? product.pictures.length
                                : 0}{" "}
                              image(s)
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                            <Link
                              className="px-2 m-2 text-gray-700 no-underline hover:text-red-600"
                              to={{
                                pathname: "sales/" + product._id,
                                state: { categories: this.props.categories }
                              }}
                            >
                              <span className="hidden">Update</span>
                              <FontAwesomeIcon icon="edit" />
                            </Link>
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
      }
    } else {
      return <LoaderScreen />;
    }
  }
}
