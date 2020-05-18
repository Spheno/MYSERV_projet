import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavTabs from "../../../Navigation/NavTabs";

import AddressList from "./AddressList";
import AddAddress from "./AddAddress";
import AddCardTabs from "./AddCardTabs";
import CardList from "./CardList";
import LoaderScreen from "../../../Loader/LoaderScreen";

/* Keep in state (from API) the list of ways of payments (cards, paypal)
   then pass it in props to CardList
*/

export default class SalesContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      phoneNumber: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: false, phoneNumber: this.props.phoneNumber });
  }

  render() {
    const { loading, phoneNumber } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      return (
        <div className="p-8 bg-white border-gray-300 rounded-lg md:shadow md:border">
          <div className="flex items-center mb-4">
            <h2 className="mr-4 text-xl">Your Payment Information</h2>
            <FontAwesomeIcon icon="credit-card" size="2x" />
          </div>

          <div className="w-full mt-8">
            <NavTabs
              tabtitles={["Your shipping address", "Add a new address"]}
              contents={[
                <AddressList phoneNumber={phoneNumber} />,
                <AddAddress phoneNumber={phoneNumber} />,
              ]}
            />
          </div>

          <div className="w-full mt-24">
            <NavTabs
              tabtitles={[
                "Your actual information",
                "Add a new payment method",
              ]}
              contents={[<CardList />, <AddCardTabs />]}
            />
          </div>
        </div>
      );
    }
  }
}
