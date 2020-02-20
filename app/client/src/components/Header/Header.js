import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Header extends React.Component {
  render() {
    return (
      <header className="flex flex-col sm:flex-row items-center justify-between py-6 relative">
        <h3 className="text-2xl font-bold text-blue-900">ShooFly</h3>
        <nav className="hidden md:flex text-lg">
          <a
            href="/dashboard"
            className="text-gray-800 hover:text-purple-300 py-3 px-6"
          >
            Home
          </a>
          <a
            href="/sales"
            className="text-gray-800 hover:text-purple-300 py-3 px-6"
          >
            Your sales
          </a>
          <div className="group inline-block relative">
            <button className="text-gray-800 hover:text-purple-300 py-3 px-4 inline-flex items-center">
              <span className="mr-1">My account</span>
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            <ul className="absolute hidden text-gray-700 pt-1 group-hover:block w-9/12">
              <li className="">
                <a
                  className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  href="/profile"
                >
                  <FontAwesomeIcon icon="user" className="mr-2" />
                  Profile
                </a>
              </li>
              <li className="">
                <a
                  className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  href="/cart"
                >
                  <FontAwesomeIcon icon="shopping-cart" className="mr-2" />
                  Cart
                </a>
              </li>
              <li className="">
                <a
                  className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
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
            className="bg-purple-200 hover:bg-purple-300 rounded-full uppercase text-purple-700 py-3 px-6"
          >
            Logout
          </button>
        </nav>
        <button className="flex md:hidden flex-col absolute top-0 right-0 p-4 mt-5">
          <span className="w-5 h-px mb-1 bg-orange-500"></span>
          <span className="w-5 h-px mb-1 bg-orange-500"></span>
          <span className="w-5 h-px mb-1 bg-orange-500"></span>
        </button>
      </header>
    );
  }
}
