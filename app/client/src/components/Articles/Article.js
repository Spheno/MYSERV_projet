import React from "react";
import ArticleSVG from "./ArticleSVG";

class Article extends React.Component {
  render() {
    return(
      <div
        className={
          "flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg " +
          (this.props.bgColor || "")
        }
      >
        <ArticleSVG source={this.props.src} />

        <div className="relative text-white px-6 pb-6 mt-6">
          <span className="block opacity-75 -mb-1">{this.props.category}</span>
          <div className="flex justify-between">
            <span className="block font-semibold text-xl">
              {this.props.name}
            </span>
            <span className="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
              {this.props.devise}
              {this.props.price}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
