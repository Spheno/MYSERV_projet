import React from "react";
import API from "../../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Header extends React.Component {
  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  render() {
    return (
      <header className="relative z-10 flex flex-col items-center justify-between py-6 sm:flex-row">
        <h3 className="text-2xl font-bold text-blue-900">ShooFly</h3>
        <nav className="hidden text-lg md:flex">
          <a
            href="/dashboard"
            className="px-6 py-3 text-gray-800 hover:text-purple-300"
          >
            Home
          </a>
          <a
            href="/sales"
            className="px-6 py-3 text-gray-800 hover:text-purple-300"
          >
            Your sales
          </a>
          <div className="relative z-10 inline-block group">
            <button className="inline-flex items-center px-4 py-3 text-gray-800 hover:text-purple-300">
              <span className="mr-1">My account</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            <ul className="absolute hidden w-9/12 text-gray-700 border border-gray-900 rounded group-hover:block">
              <li className="">
                <a
                  className="block px-4 py-2 whitespace-no-wrap bg-gray-200 rounded-t hover:bg-gray-400"
                  href="/profile"
                >
                  <FontAwesomeIcon icon="user" className="mr-2" />
                  Profile
                </a>
              </li>
              <li className="">
                <a
                  className="block px-4 py-2 whitespace-no-wrap bg-gray-200 hover:bg-gray-400"
                  href="/cart"
                >
                  <FontAwesomeIcon icon="shopping-cart" className="mr-2" />
                  Cart
                </a>
              </li>
              <li className="">
                <a
                  className="block px-4 py-2 whitespace-no-wrap bg-gray-200 rounded-b hover:bg-gray-400"
                  href="/favs"
                >
                  <FontAwesomeIcon icon="heart" className="mr-2" />
                  Favs
                </a>
              </li>
            </ul>
          </div>

          <button
            onClick={this.disconnect}
            className="px-6 py-3 text-purple-700 uppercase bg-purple-200 rounded-full hover:bg-purple-300"
          >
            Logout
          </button>
        </nav>
        <button className="absolute top-0 right-0 flex flex-col p-4 mt-5 md:hidden">
          <span className="w-5 h-px mb-1 bg-orange-500"></span>
          <span className="w-5 h-px mb-1 bg-orange-500"></span>
          <span className="w-5 h-px mb-1 bg-orange-500"></span>
        </button>
      </header>
    );
  }
}
