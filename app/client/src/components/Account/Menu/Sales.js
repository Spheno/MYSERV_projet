import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import SVGIcon from "../../SVG/SVGIcon";
import salesSVG from "../../../images/sales.svg";
import NavTabs from "../../Navigation/NavTabs";
import SalesBuyings from "../Content/Sales/SalesBuyings";
import SalesSellings from "../Content/Sales/SalesSellings";
import SalesArticleForm from "../Content/Sales/SalesArticleForm";

import { connect } from "react-redux";
import { getCategories } from "../../../redux/actions/category_actions";
import SalesModifyProduct from "../Content/Sales/SalesModifyProduct";
import LoaderScreen from "../../Loader/LoaderScreen";

class Sales extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      phoneNumber: "",
      categories: []
    };
  }

  async componentDidMount() {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const { getCategories } = this.props;
      await getCategories();
      this.setState({
        loading: false,
        phoneNumber: userData.phoneNumber,
        categories: this.props.categories
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { loading, phoneNumber, categories } = this.state;

    if (!loading) {
      return (
        <div className="z-50 p-6 bg-purple-700">
          <div className="flex flex-col font-sans bg-white">
            <div className="container px-8 mx-auto">
              <Header />

              <main className="flex flex-col-reverse items-center py-8 mb-4 sm:flex-row jusitfy-between">
                <div className="flex flex-col items-center w-full text-center sm:items-start sm:text-left">
                  <h1 className="mb-2 text-6xl font-bold leading-none tracking-wide text-blue-900">
                    Your sales
                  </h1>
                  <h2 className="mb-6 text-4xl tracking-widest text-orange-500 text-secondary">
                    Follow your transactions.
                  </h2>
                </div>
                <SVGIcon
                  src={salesSVG}
                  cls="z-0 absolute right-0 hidden h-64 max-w-xs mr-32 lg:flex"
                />
                <div className="mt-8 mb-16 sm:mb-0 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
              </main>

              <NavTabs
                tabtitles={[
                  "Modify your products",
                  "Add a product",
                  "Buyings",
                  "Sellings"
                ]}
                contents={[
                  <SalesModifyProduct phoneNumber={phoneNumber} />,
                  <SalesArticleForm categories={categories} />,
                  <SalesBuyings />,
                  <SalesSellings />
                ]}
              />
            </div>

            <Footer />
          </div>
        </div>
      );
    } else {
      return <LoaderScreen />;
    }
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  errorCategories: state.categories.error
});

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
