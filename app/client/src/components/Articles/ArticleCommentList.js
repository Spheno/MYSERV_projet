import React from "react";
import LoaderScreen from "../Loader/LoaderScreen";
import Review from "../Review/Review";

import API from "../../utils/productsAPI";

export default class ArticleCommentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      productID: "",
      reviews: []
    };
  }

  // Get list of comments of product
  async componentDidMount() {
    try {
      const response = await API.getProductComments(this.props.productID);
      this.setState({
        loading: false,
        reviews: response.reviews,
        productID: this.props.productID
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { loading, reviews, productID } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      if (reviews.length > 0) {
        return (
          <div>
            {reviews.map((review, index) => {
              return (
                <Review
                  review={review}
                  key={index}
                  productID={productID}
                  isProduct={true}
                />
              );
            })}
          </div>
        );
      } else {
        return <p className="mb-8 leading-relaxed text-gray-500">None</p>;
      }
    }
  }
}
