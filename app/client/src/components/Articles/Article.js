import React from "react";
import ArticleSVG from "./ArticleSVG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import imgNotFound from "../../images/articles/not_found.png";

const Article = props => {
  // devise and bgColor are not in props but could be in future
  // (for the moment, they are replaced by "€" and "bg-gray-500")
  const {
    bgColor,
    category,
    title,
    devise,
    price,
    pictures,
    imagePath
  } = props;

  let imgPath = imagePath;

  pictures.map(picture => {
    return (imgPath = picture.path);
  });

  if (!imgPath) imgPath = imgNotFound;

  return (
    <div
      className={
        "m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg " +
        (bgColor || "bg-gray-500")
      }
    >
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
        <button
          type="button"
          className="mr-2 hover:text-blue-600"
        >
          <Link
            to={{
              pathname: "product/" + props._id,
              state: { product: props }
            }}
          >
            <span className="hidden">Details</span>
            <FontAwesomeIcon icon="info-circle" size="2x" />
          </Link>
        </button>
        <button
          type="button"
          className="mr-2 hover:text-teal-600" /* onClick={this.addToCart} */
        >
          <FontAwesomeIcon icon="cart-plus" size="2x" />
        </button>
        <button
          type="button"
          className="hover:text-red-600" /* onClick={this.addToFav} */
        >
          <FontAwesomeIcon icon="heart" size="2x" />
        </button>
      </div>
    </div>
  );
};

export default Article;
