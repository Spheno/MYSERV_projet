import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavTabs from "../../../Navigation/NavTabs";

import AddCard from "./AddCard";
import AddPaypal from "./AddPaypal";

export default class AddCardTabs extends React.Component {
  render() {
    return (
      <NavTabs
        icons={[null, <FontAwesomeIcon icon={["fab", "paypal"]} />]}
        tabtitles={["Credit Card", "Paypal"]}
        contents={[<AddCard />, <AddPaypal />]}
      />
    );
  }
}
