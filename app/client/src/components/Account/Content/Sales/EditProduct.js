import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import API from "../../../../utils/productsAPI";
import LoaderScreen from "../../../Loader/LoaderScreen";
import Header from "../../../Header/Header";
import SVGIcon from "../../../SVG/SVGIcon";

import editProduct from "../../../../images/editProduct.svg";
import Footer from "../../../Footer/Footer";

import {
  faStream,
  faTags,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { useParams } from "react-router-dom";

const NB_TAGS_MAX = 5;

export default function EditProduct(props) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    pictures: [],
    tags: [],
    title: "",
    description: "",
    price: 0,
    category: "Other"
  });

  let location = useLocation();
  const { categories } = location.state; // categories list to display items in select
  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await API.getProduct(id);
        setLoading(false);
        setProduct(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, [id]);

  const handleSubmit = event => {
    event.preventDefault();
  };

  const emptyBoxes = emptyImgToShow => {
    let boxes = [];
    for (let i = 0; i < emptyImgToShow; i++) {
      boxes.push(
        <div
          key={i.toString()}
          className={
            "w-full px-2 mb-4 lg:flex-1 lg:mb-0 md:w-1/" + emptyImgToShow
          }
        >
          <div
            className={
              "h-48 flex justify-center items-center bg-gray-300 lg:h-56 w-full"
            }
          >
            <FontAwesomeIcon icon="plus-circle" size="7x" />
          </div>
        </div>
      );
    }

    return boxes;
  };

  if (!loading && product) {
    console.log("prod", product);
    let emptyImgToShow = 3; // if the user has not uploaded a picture yet, we show 3 empty boxes

    return (
      <div className="z-50 p-6 bg-purple-700">
        <div className="flex flex-col font-sans bg-white">
          <div className="container px-8 mx-auto">
            <Header />

            <main className="flex flex-col-reverse items-center py-8 mb-4 sm:flex-row jusitfy-between">
              <div className="flex flex-col items-center w-full text-center sm:items-start sm:text-left">
                <h1 className="mb-2 text-6xl font-bold leading-none tracking-wide text-blue-900">
                  Modify your product
                </h1>
                <h2 className="mb-6 text-4xl tracking-widest text-orange-500 text-secondary">
                  You can change everything.
                </h2>
              </div>
              <SVGIcon
                src={editProduct}
                cls="z-0 absolute right-0 hidden h-64 max-w-xs mr-32 lg:flex"
              />
              <div className="mt-8 mb-16 sm:mb-0 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
            </main>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              method="post"
            >
              <div className="flex flex-col px-8 pt-6 pb-8 my-2 mb-4 bg-white border-gray-300 rounded md:shadow-md md:border">
                <div className="px-3 mb-6 -mx-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-product-category"
                  >
                    Title <FontAwesomeIcon icon={faStream} size="1x" />
                  </label>
                  <input
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={e => {
                      const value = e.target.value;
                      setProduct(prevState => {
                        return { ...prevState, title: value };
                      });
                    }}
                  />
                </div>

                <div className="mb-6 -mx-3 lg:flex">
                  <div className="px-3 mb-6 lg:w-1/2 lg:mb-0">
                    <h3 className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                      Pictures <FontAwesomeIcon icon="camera" size="1x" />
                    </h3>
                    <div className="flex flex-wrap h-full -mx-2">
                      {product.pictures.map((picture, index) => {
                        emptyImgToShow--;
                        return (
                          <div
                            key={index}
                            className={
                              "w-full px-2 mb-4 lg:mb-0 lg:flex-1 md:w-1/" +
                              emptyImgToShow
                            }
                          >
                            <img
                              className="w-full h-48 p-1 bg-gray-300 bg-center bg-no-repeat bg-cover lg:h-56"
                              src={"/" + picture.path}
                              alt=""
                            />
                          </div>
                        );
                      })}
                      {console.log("empty", emptyImgToShow)}
                      {emptyBoxes(emptyImgToShow)}
                    </div>
                  </div>
                  <div className="px-3 lg:w-1/2">
                    <label
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                      htmlFor="grid-product-description"
                    >
                      Description <FontAwesomeIcon icon="edit" size="1x" />
                    </label>
                    <textarea
                      className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border rounded appearance-none border-gray-lighter"
                      id="grid-product-description"
                      rows="9"
                      type="text"
                      name="description"
                      placeholder="Describe me"
                      value={product.description}
                      onChange={e => {
                        const value = e.target.value;
                        setProduct(prevState => {
                          return { ...prevState, description: value };
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="mb-2 -mx-3 md:flex">
                  <div className="px-3 mb-6 md:w-1/2 md:mb-0">
                    <label
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                      htmlFor="grid-product-price"
                    >
                      Price{" "}
                      <FontAwesomeIcon icon="money-bill-wave-alt" size="1x" />
                    </label>
                    <div className="relative flex flex-wrap items-stretch w-full py-1">
                      <div className="flex">
                        <span className="flex items-center px-3 text-sm leading-normal text-gray-700 whitespace-no-wrap bg-gray-200 border border-gray-500">
                          €
                        </span>
                      </div>
                      <input
                        type="number"
                        name="price"
                        id="grid-product-price"
                        min="0"
                        className="relative flex-1 flex-auto flex-grow flex-shrink w-px h-10 px-3 px-4 py-3 leading-normal bg-gray-200 border border-gray-200 rounded appearance-none"
                        value={product.price}
                        onChange={e => {
                          const value = e.target.value;
                          setProduct(prevState => {
                            return { ...prevState, price: value };
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <label
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                      htmlFor="grid-product-category"
                    >
                      Category <FontAwesomeIcon icon={faStream} size="1x" />
                    </label>
                    <div className="relative">
                      {
                        <select
                          className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-product-category"
                          name="category"
                          onChange={e => {
                            const value = e.target.value;
                            setProduct(prevState => {
                              return { ...prevState, category: value };
                            });
                          }}
                        >
                          <option defaultValue={product.category}>Other</option>
                          {categories.map((cat, index) => {
                            return (
                              <option key={index} value={cat}>
                                {cat}
                              </option>
                            );
                          })}
                        </select>
                      }
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                        <svg
                          className="w-4 h-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-product-tags"
                  >
                    Tags <FontAwesomeIcon icon={faTags} size="1x" />
                  </label>

                  <ReactTagInput
                    id="grid-product-tags"
                    name="tags"
                    tags={product.tags}
                    placeholder={
                      "Type and press enter (" + NB_TAGS_MAX + " max.)"
                    }
                    maxTags={NB_TAGS_MAX}
                    editable={true}
                    readOnly={false}
                    removeOnBackspace={true}
                    onChange={newTags => {
                      setProduct(prevState => {
                        return { ...prevState, tags: newTags };
                      });
                    }}
                  />
                </div>

                <div className="flex content-center my-8 text-center">
                  <div className="w-full">
                    <button
                      type="submit"
                      className="hidden w-40 py-3 -mt-4 text-white bg-green-500 rounded hover:bg-green-700 md:inline focus:outline-none"
                    >
                      Update
                    </button>
                    <button
                      type="submit"
                      className="inline px-16 py-3 -mt-4 text-white bg-green-500 border border-green-500 rounded md:hidden hover:bg-green-700 focus:outline-none"
                    >
                      <FontAwesomeIcon icon={faPaperPlane} size="1x" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <Footer />
        </div>
      </div>
    );
  } else {
    return <LoaderScreen />;
  }
}
