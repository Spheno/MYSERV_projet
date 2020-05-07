import React from "react";
import Article from "./Article";
import Loader from "../Loader/LoaderScreen";
import Quote from "../Quote";
import ListCategories from "../Categories/ListCategories";

class ArticlesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      // if it's the author asking for articles, he doesn't need to have buttons to add to cart or favorites
      fromAuthor: false, 
      categories: [],
      user: [],
      articles: [],
      filteredArticles: []
    };

    this.filterProducts = this.filterProducts.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: false,
      fromAuthor: this.props.fromAuthor || false,
      categories: this.props.categories,
      user: this.props.user,
      filteredArticles: this.props.products,
      articles: this.props.products
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.products !== prevProps.products) {
      this.setState({ articles: this.props.products });
      this.setState({ filteredArticles: this.props.products });
    }
    if (this.props.user !== prevProps.user) {
      this.setState({ user: this.props.user });
    }
    if (this.props.categories !== prevProps.categories) {
      this.setState({ categories: this.props.categories });
    }
  }

  filterProducts(category) {
    let filteredArticles = this.state.filteredArticles;

    if (category === "All") {
      this.setState({ articles: this.props.products });
    } else {
      filteredArticles = filteredArticles.filter(article => {
        return article.category === category;
      });

      this.setState({ articles: filteredArticles });
    }
  }

  render() {
    const { loading, fromAuthor, categories, user, articles } = this.state;

    if (!loading) {
      return (
        <>
          <div className="my-12">
            <ListCategories
              categories={categories}
              showCategory={this.filterProducts}
            />
          </div>

          <div className="flex flex-wrap items-stretch justify-center">
            {articles.length > 0 &&
              articles.map((product, index) => (
                <Article
                  key={index}
                  {...product}
                  userNumber={user.phoneNumber}
                  fromAuthor={fromAuthor}
                />
              ))}
          </div>

          <div>
            {articles.length === 0 && (
              <Quote
                name="Apollo 13 (1995)"
                quote="Houston, we have a problem."
              />
            )}
          </div>
        </>
      );
    } else {
      return <Loader />;
    }
  }
}

export default ArticlesList;
