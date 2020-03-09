import React from "react";
import API from "../../utils/userAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";
import "../../styles/burgerMenu.css";

export default class Header extends React.Component {
  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  render() {
    return (
      <header className="relative z-10 flex flex-col items-center py-6 sm:flex-row">
        <h3 className="text-2xl font-bold text-blue-900">
          <a href="/dashboard">ShooFly</a>
        </h3>
        <nav className="hidden text-lg md:flex">
          <div className="absolute top-0 right-0 justify-between mt-6">
            <span className="hidden lg:inline">
              <input
                type="search"
                placeholder="Search items, users, ..."
                className="relative px-2 py-1 pl-10 text-sm leading-normal text-gray-700 transition bg-gray-100 border rounded appearance-none w-60 focus:outline-none focus:border-gray-700"
              />
              <div className="absolute top-0 left-0 mt-4 ml-2">
                <svg
                  className="w-4 h-4 text-gray-700 pointer-events-none fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                </svg>
              </div>
            </span>

            <a
              href="/dashboard"
              className="mx-4 my-3 text-2xl text-gray-700 hover:text-purple-300"
            >
              <FontAwesomeIcon icon="home" title="Home" />
            </a>
            <a
              href="/sales"
              className="mx-4 my-3 text-2xl text-gray-700 hover:text-purple-300"
            >
              <FontAwesomeIcon icon="money-bill-wave-alt" title="Your sales" />
            </a>
            <a
              href="/favs"
              className="mx-4 my-3 text-2xl text-gray-700 hover:text-purple-300"
            >
              <FontAwesomeIcon icon="heart" title="Favorites" />
            </a>
            <a
              href="/cart"
              className="mx-4 my-3 text-2xl text-gray-700 hover:text-purple-300"
            >
              <FontAwesomeIcon icon="shopping-cart" title="Cart" />
            </a>
            <a
              href="/profile"
              className="mx-4 my-3 text-2xl text-gray-700 hover:text-purple-300"
            >
              <FontAwesomeIcon icon="user" title="Profile" />
            </a>
            <a
              href="#top"
              onClick={this.disconnect}
              className="mx-4 my-3 text-2xl text-gray-700 hover:text-purple-300"
            >
              <FontAwesomeIcon icon="sign-out-alt" title="Logout" />
            </a>
          </div>
        </nav>

        <Sidebar />
      </header>
    );
  }
}
