import React from "react";
import API from "../../utils/userAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";
//import SearchInput from "./SearchInput";
import "../../styles/burgerMenu.css";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: 0 // à récupérer depuis le store
    };
  }

  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  render() {
    return (
      <header className="relative z-10 flex flex-col items-center py-6 sm:flex-row">
        <div className="flex">
          <h3 className="text-3xl font-bold text-blue-900">
            <a href="/dashboard">ShooFly</a>
          </h3>
          <span className="mx-8 mt-1 text-2xl text-gray-700">
            {this.state.coins}{" "}
            <FontAwesomeIcon icon="coins" title="Your wallet" />
          </span>
        </div>
        <nav className="hidden text-lg md:flex">
          <div className="absolute top-0 right-0 mt-6">
            <span className="fixed top-0 right-0 w-auto mt-12 mr-12 bg-gray-100 border shadow">
              <a
                href="/dashboard"
                className="mx-4 my-3 text-2xl text-gray-700 hover:text-purple-300"
              >
                <FontAwesomeIcon icon="home" title="Home" />
                <span className="sr-only">Home</span>
              </a>
              <a
                href="/sales"
                className="mx-4 my-3 text-2xl text-gray-700 hover:text-purple-300"
              >
                <FontAwesomeIcon
                  icon="money-bill-wave-alt"
                  title="Your sales"
                />
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
            </span>
          </div>
        </nav>

        <Sidebar />
      </header>
    );
  }
}
