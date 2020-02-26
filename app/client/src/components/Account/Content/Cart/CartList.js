import React from "react";
import CartArticle from "./CartArticle";

export default class CartList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }

  render() {
    return (
      <div className="z-10">
        <CartArticle />


      </div>
    );
  }
}
