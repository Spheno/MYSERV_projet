import React from "react";

import API from "../../utils/searchAPI";
import LoaderScreen from "../Loader/LoaderScreen";
import Article from "../Articles/Article";

import emptySVG from "../../images/empty.svg";
import SVGIcon from "../SVG/SVGIcon";

export default class SearchByProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      products: [],
      userNumber: "",
    };
  }

  async componentDidMount() {
    try {
      const response = await API.searchByProduct(this.props.productName);
      console.log("res", response);
      this.setState({
        loading: false,
        products: response,
        userNumber: this.props.userNumber,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { loading, products, userNumber } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      return (
        <>
          <div className="px-2 py-3 mt-0">
            <h2 className="flex-1 text-2xl font-bold tracking-wide text-gray-800 uppercase">
              Products
            </h2>
            <p className="flex-1 text-lg tracking-wide text-gray-600 uppercase">
              ({products.length} item(s) found)
            </p>
          </div>

          <div className="flex flex-wrap items-stretch justify-center">
            {products.length === 0 && (
              <SVGIcon src={emptySVG} cls="h-64 max-w-xs flex" />
            )}

            {products.length > 0 &&
              products.map((product, index) => {
                return (
                  <Article key={index} {...product} userNumber={userNumber} />
                );
              })}
          </div>
        </>
      );
    }
  }
}
