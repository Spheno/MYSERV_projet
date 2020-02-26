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
          <input
            type="search"
            className="p-3 bg-gray-200 border-0 rounded shadow"
            placeholder="Search item, user..."
          />
          <div className="absolute top-0 right-0 mt-3 mr-4 text-purple-500">
            <svg
              viewBox="0 0 52.966 52.966"
            />
            <path
              d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
        c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
        C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
        S32.459,40,21.983,40z"
            />
          </div>
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
