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
      </div>
    );
  }
}

export default Article;
