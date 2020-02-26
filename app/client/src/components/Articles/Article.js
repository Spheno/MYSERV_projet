import React from "react";
import ArticleSVG from "./ArticleSVG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Article extends React.Component {  
  render() {
    return (
      <div
        className={
          "flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg " +
          (this.props.bgColor || "")
        }
      >
        <ArticleSVG source={this.props.src} />

        <div className="relative px-6 pb-6 mt-6 text-white">
          <span className="block -mb-1 opacity-75">{this.props.category}</span>
          <div className="flex justify-between">
            <span className="block text-xl font-semibold">
              {this.props.name}
            </span>
            <span className="flex items-center block px-3 py-2 text-xs font-bold leading-none text-orange-500 bg-white rounded-full">
              {this.props.devise}
              {this.props.price}
            </span>
          </div>
        </div>

        <div className="absolute top-0 right-0 m-3 text-white text-">
          <button type="button" className="mr-2 hover:text-teal-600" /* onClick={this.addToCart} */>
            <FontAwesomeIcon icon="cart-plus" size="2x" />
          </button>
          <button type="button" className="hover:text-red-600" /* onClick={this.addToFav} */>
            <FontAwesomeIcon icon="heart" size="2x" />
          </button>
        </div>
      </div>
    );
  }
}

export default Article;
