import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import routes from "./routes";

/* Instead of adding all the icons of font awesome, we make our own lib with only what we need */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faShoppingCart,
  faHeart,
  faCogs,
  faUserCircle,
  faCreditCard,
  faMapMarkerAlt,
  faCamera,
  faEdit,
  faTrashAlt,
  faCartPlus,
  faSignOutAlt,
  faHome,
  faMoneyBillWaveAlt,
  faWallet,
  faListOl,
  faInfoCircle,
  faCoins,
  faPlusCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagram,
  faPaypal,
  faCcVisa,
  faCcMastercard
} from "@fortawesome/free-brands-svg-icons";
library.add(
  faUser,
  faShoppingCart,
  faHeart,
  faCogs,
  faUserCircle,
  faCreditCard,
  faFacebookSquare,
  faInstagram,
  faMapMarkerAlt,
  faCamera,
  faEdit,
  faTrashAlt,
  faCartPlus,
  faSignOutAlt,
  faHome,
  faMoneyBillWaveAlt,
  faWallet,
  faListOl,
  faInfoCircle,
  faPaypal,
  faCcVisa,
  faCcMastercard,
  faCoins,
  faPlusCircle,
  faCheckCircle
);

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default withRouter(connect()(App));
