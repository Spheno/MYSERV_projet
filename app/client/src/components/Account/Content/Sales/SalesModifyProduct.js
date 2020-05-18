import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import API from "../../../../utils/userAPI";
import uploadsAPI from "../../../../utils/uploadsAPI";
import LoaderScreen from "../../../Loader/LoaderScreen";
import Quote from "../../../Quote";
import ReadableDate from "../../../Date/ReadableDate";
import { ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; /* custom confirm pop up */
import AlertDeleteArticle from "../../../Alerts/AlertDeleteArticle";

export default class SalesModifyProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showAlert: false,
      myProducts: [],
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

  deleteArticle = async (productID, phoneNumber, title) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            this.setState({ showAlert: true });
            try {
              const deleteRes = await uploadsAPI.deleteProduct(
                productID,
                phoneNumber,
                title
              );
              console.log("res remove from my articles", deleteRes);
            } catch (error) {
              console.log("Error delete from my articles", error);
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
    const { loading, showAlert, myProducts } = this.state;
    console.log("my prods", myProducts);

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
                <AlertDeleteArticle
                  showAlert={showAlert}
                  closeAlert={this.closeAlert.bind(this)}
                />

                <div className="form-group">
                  <ToastContainer />
                </div>

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
                    {(myProducts || []).map((product, index) => {
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
                              {product.tags.length ? (
                                product.tags.map((tag, index) => {
                                  return (
                                    <span
                                      key={index}
                                      className="p-2 mr-1 bg-gray-300 rounded-md"
                                    >
                                      {tag}
                                    </span>
                                  );
                                })
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
                              className="m-2 text-gray-700 no-underline hover:text-teal-600"
                              to={{
                                pathname: "/product/" + product._id,
                                state: { product: product },
                              }}
                            >
                              <span className="hidden">Details</span>
                              <FontAwesomeIcon icon="info-circle" />
                            </Link>

                            <Link
                              className="px-2 m-2 text-gray-700 no-underline hover:text-red-600"
                              to={{
                                pathname: "/sales/" + product._id,
                                state: { categories: this.props.categories },
                              }}
                            >
                              <span className="hidden">Update</span>
                              <FontAwesomeIcon icon="edit" />
                            </Link>
                            <button
                              className="px-1 m-1 text-gray-700 no-underline hover:text-black"
                              href="#top"
                              onClick={() =>
                                this.deleteArticle(
                                  product._id,
                                  product.authorNumber,
                                  product.title
                                )
                              }
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
