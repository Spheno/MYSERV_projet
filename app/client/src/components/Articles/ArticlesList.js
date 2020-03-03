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
        <div className="flex flex-wrap items-center justify-center">
          {articles.length
            ? articles.map((product, index) => (
                <Article key={index} {...product} />
              ))
            : null}

          {/* fake datas for test, delete after */}
          {/*     
          <Article
            bgColor="bg-red-500"
            category="Garden"
            title="Petite Lily"
            devise="€"
            price="36.00"
            imagePath="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
          />
          <Article
            bgColor="bg-yellow-500"
            category="Garden"
            title="Petite Lily"
            devise="€"
            price="36.00"
            imagePath="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
          />
          <Article
            bgColor="bg-gray-500"
            category="Garden"
            title="Petite Lily"
            devise="€"
            price="36.00"
            imagePath="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
          />
          <Article
            bgColor="bg-orange-500"
            category="Garden"
            title="Petite Lily"
            devise="€"
            price="36.00"
            imagePath="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
          />
          <Article
            bgColor="bg-teal-500"
            category="Indoor"
            title="Montsera"
            devise="€"
            price="45.00"
            imagePath="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
          />
          <Article
            bgColor="bg-purple-500"
            category="Outdoor"
            title="Oak Tree"
            devise="€"
            price="68.50"
            imagePath="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
          />
          */}
          {/* delete above */}
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

export default ArticlesList;
