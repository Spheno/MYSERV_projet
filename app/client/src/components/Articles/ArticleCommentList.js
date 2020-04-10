import React from "react";
import LoaderScreen from "../Loader/LoaderScreen";
import ArticleComment from "./ArticleComment";

export default class ArticleCommentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      nbComments: 1
    };
  }

  // Get list of comments of product

  render() {
    let { loading } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      return <div>
          <ArticleComment />
      </div>;
    }
  }
}
