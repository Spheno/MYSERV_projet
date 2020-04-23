import React from "react";

export default class ListCategories extends React.Component {
  render() {
    var categories = this.props.categories.map((category, index) => {
      return (
        <button
          key={index}
          className="px-4 py-2 mr-1 font-bold text-gray-800 bg-gray-300 border border-gray-500 rounded hover:bg-gray-400"
          onClick={() => this.props.showCategory(category)}
        >
          {category}
        </button>
      );
    });

    return <div className="flex flex-wrap items-center justify-center">{categories}</div>;
  }
}
