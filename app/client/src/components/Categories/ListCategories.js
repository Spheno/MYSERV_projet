import React from "react";

export default class ListCategories extends React.Component {
  render() {
    var categories = this.props.categories.map((category, index) => {
      return (
        <a
          key={index}
          href="#top"
          className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
        >
          {category}
        </a>
      );
    });

    return <div className="flex flex-wrap items-center justify-center">{categories}</div>;
  }
}
