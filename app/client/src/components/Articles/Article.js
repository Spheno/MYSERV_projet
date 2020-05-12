import React from "react";
import ArticleSVG from "./ArticleSVG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import API from "../../utils/userAPI";

import imgNotFound from "../../images/articles/not_found.png";

const Article = props => {
  // devise and bgColor are not in props but could be in future
  // (for the moment, they are replaced by "€" and "bg-gray-500")
  const {
    userNumber,
    bgColor,
    category,
    title,
    devise,
    price,
    pictures,
    fromAuthor // hide some buttons if author
  } = props;


  if(pictures.length && pictures[0].path.charAt(0) !== '/') pictures[0].path = "\\" + pictures[0].path
  let imgPath = pictures.length ? pictures[0].path : imgNotFound;

  console.log("imgPath", imgPath)

  async function addToCart(data) {
    try {
      console.log("data", data);
      const response = await API.addToCart(data);
      if (response) {
        toast.success("Successfully added to your cart!");
        console.log("addToCart", response);
      }
    } catch (error) {
      console.log(error);
      toast.error("Oups an error has occured...");
    }
  }

  async function addToFavs(data) {
    try {
      console.log("data", data);
      const response = await API.addToFavs(data);
      if (response) {
        toast.success("Successfully added to your favorites!");
        console.log("addToFavs", response);
      }
    } catch (error) {
      console.log(error);
      toast.error("Oups an error has occured...");
    }
  }

  console.log("product card", props)

  return (
    <div
      className={
        "m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg " +
        (bgColor || "bg-gray-500")
      }
    >
      <div className="form-group">
        <ToastContainer />
      </div>

      <ArticleSVG source={imgPath} />

      <div className="relative px-6 pb-6 mt-6 text-white">
        <span className="block -mb-1 opacity-75">{category}</span>
        <div className="flex justify-between">
          <span className="block text-xl font-semibold">{title}</span>
        </div>
      </div>

      <div className="absolute top-0 left-0 m-3 text-white">
        <span className="flex items-center px-3 py-2 text-xs font-bold leading-none text-orange-500 bg-white rounded-full">
          {devise || "€"}
          {price}
        </span>
      </div>

      <div className="absolute bottom-0 right-0 m-6 text-white">
        <button type="button" className="mr-2 hover:text-blue-600">
          <Link
            to={{
              pathname: "/product/" + props._id,
              state: { product: props }
            }}
          >
            <span className="hidden">Details</span>
            <FontAwesomeIcon icon="info-circle" size="2x" />
          </Link>
        </button>

        {!fromAuthor && (
          <>
            <button
              type="button"
              className="mr-2 hover:text-teal-600"
              onClick={() =>
                addToCart({
                  productID: props._id,
                  buyerPhoneNumber: userNumber
                })
              }
            >
              <FontAwesomeIcon icon="cart-plus" size="2x" />
            </button>
            <button
              type="button"
              className="hover:text-red-600"
              onClick={() =>
                addToFavs({ productID: props._id, favPhoneNumber: userNumber })
              }
            >
              <FontAwesomeIcon icon="heart" size="2x" />
            </button>
          </>
        )}
        
      </div>
    </div>
  );
};

export default Article;
