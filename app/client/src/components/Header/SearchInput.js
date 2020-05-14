import React, { useState } from "react";

export default function SearchInput(props) {
  const [search, setSearch] = useState("");
  const [by, setBy] = useState("product");

  const submitSearch = async (e) => {
    e.preventDefault();

    if (search.trim() === "") {
      alert("Search can't be empty");
      return false;
    }

    window.location.href =
      "/search/" + by + "/" + search.replace(/\s+/g, "-").toLowerCase();
  };

  return (
    <form className="flex p-2 bg-white shadow" onSubmit={submitSearch}>
      <span className="flex items-center justify-end w-auto p-2">
        <svg
          className="w-4 h-4 text-gray-500 pointer-events-none fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
        </svg>
      </span>
      <input
        className="w-full rounded"
        type="text"
        placeholder="Try me!"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        required
      />

      <div className="relative inline-block w-64 ml-2">
        <select
          onChange={(e) => setBy(e.target.value)}
          value={by}
          className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
        >
          <option value="product">Product</option>
          <option value="user">User</option>
          <option value="tag">Tag</option>
        </select>
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

      <button
        type="submit"
        className="p-2 ml-2 text-white bg-red-400 rounded hover:bg-red-300"
      >
        <p className="text-xs font-semibold">Search</p>
      </button>
    </form>
  );
}
