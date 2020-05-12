import React from "react";

import userAPI from "../../../../utils/userAPI";
import categoriesAPI from "../../../../utils/categoriesAPI";

import LoaderScreen from "../../../Loader/LoaderScreen";
import ArticlesList from "../../../Articles/ArticlesList";
import Quote from "../../../Quote";

export default class ProfileSales extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      categories: [],
      user: [],
      sales: []
    };
  }

  componentDidMount = async e => {
    try {
      const categories = await categoriesAPI.getCategories();
      const sales = await userAPI.getMyProducts(this.props.phoneNumber);
      this.setState({
        loading: false,
        isAuthor: this.props.isAuthor,
        user: this.props.user,
        categories: categories.data,
        sales
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { loading, isAuthor, user, categories, sales } = this.state;
    if (loading) {
      return <LoaderScreen />;
    } else {
      console.log("sales", sales);
      if (sales.length === 0) {
        return <Quote name="Gone With the Wind, 1939" quote="After all, tomorrow is another day!" />;
      } else {
        return (
          <div>
            <ArticlesList
              categories={categories}
              products={sales}
              user={user}
              fromAuthor={isAuthor}
            />
          </div>
        );
      }
    }
  }
}
