import React from "react";

export default class SearchInput extends React.Component {
  render() {
    return (
      <>
        <input
          type="search"
          placeholder="Search items, users, ..."
          className="relative px-2 py-1 pl-10 text-sm leading-normal text-gray-700 transition bg-white border rounded-full appearance-none w-60 focus:outline-none focus:border-gray-700"
        />
        <div className="absolute top-0 left-0 mt-4 ml-2">
          <svg
            className="w-4 h-4 text-gray-700 pointer-events-none fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
          </svg>
        </div>
      </>
    );
  }
}
