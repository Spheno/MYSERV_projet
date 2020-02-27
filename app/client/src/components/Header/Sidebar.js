import React from "react";
import API from "../../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { slide as Menu } from "react-burger-menu";

export default class Sidebar extends React.Component {
  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  render() {
    return (
      <Menu right >
        <a className="menu-item" href="/dashboard">
          <FontAwesomeIcon icon="home" className="mr-2" /> Home
        </a>

        <a className="menu-item" href="/sales">
          <FontAwesomeIcon icon="money-bill-wave-alt" className="mr-2" /> Your
          sales
        </a>

        <a className="menu-item" href="/profile">
          <FontAwesomeIcon icon="user" className="mr-2" /> My profile
        </a>

        <a className="menu-item" href="/cart">
          <FontAwesomeIcon icon="shopping-cart" className="mr-2" /> My cart
        </a>

        <a className="menu-item" href="/favs">
          <FontAwesomeIcon icon="heart" className="mr-2" /> My favorites
        </a>

        <hr />

        <button className="menu-item" onClick={this.disconnect}>
          <FontAwesomeIcon icon="sign-out-alt" className="mr-2" /> Logout
        </button>
      </Menu>
    );
  }
}
