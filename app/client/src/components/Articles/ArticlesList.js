import React from "react";
import Article from "./Article";
import Loader from "../Loader/LoaderScreen";

class ArticlesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      articles: []
    };
  }

  componentDidMount() {
    this.setState({ loading: false, articles: this.props.products });
  }

  componentDidUpdate(prevProps) {
    if (this.props.products !== prevProps.products) {
      this.setState({ articles: this.props.products });
    }
  }

  render() {
    const { loading, articles } = this.state;

    if (!loading) {
      return (
        <div className="flex flex-wrap items-stretch justify-center">
          {articles.length
            ? articles.map((product, index) => (
                <Article key={index} {...product} />
              ))
            : null}
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

export default ArticlesList;
