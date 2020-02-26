import React from "react";
import FavArticle from "./FavArticle";

export default class FavsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  render() {
    return (
      <div className="z-10">
        <FavArticle />
      </div>
    );
  }
}
