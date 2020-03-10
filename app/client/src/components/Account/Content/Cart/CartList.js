import React from "react";
import CartArticle from "./CartArticle";

export default class CartList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      nbArticles: 3,
      total: 115,
      devise: "€"
    };
  }

  render() {
    if (this.state.nbArticles) {
      return (
        <div className="z-10">
          <div className="block w-full">
            <h1 className="text-3xl font-medium leading-snug tracking-wider text-center text-gray-800">
              Number of articles: {this.state.nbArticles}
            </h1>
            <p className="px-6 mt-2 text-lg text-center text-gray-700">
              Total: {this.state.total}{this.state.devise}
            </p>
            <div className="w-24 h-1 mx-auto my-6 bg-indigo-700 rounded opacity-75"></div>

            <div className="container px-4 mx-auto my-12 md:px-12">
              <div className="flex flex-wrap -mx-1 lg:-mx-4">
                <div className="w-full px-1 my-1 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                  <CartArticle />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      );
    } else return <p>Wow such empty</p>;
  }
}
