import React from "react";

import Header from "../Header/Header";
import SVGIcon from "../SVG/SVGIcon";
import Carousel from "../Header/Carousel";
import ArticlesList from "../Articles/ArticlesList";
import Footer from "../Footer/Footer";

import dashboardSVG from "../../images/dashboard.svg";
import ListCategories from "../Categories/ListCategories";

import Quote from "../Quote";
import Loader from "../Loader/LoaderScreen";
import PaginationComp from "../Pagination/PaginationComp";

import { connect } from "react-redux";
import { getAllData } from "../../redux/actions/all_actions"; // redux dispatch categories and products

const ARTICLES_PER_PAGE = 2;

/* 0, 1 or 2 ;
   2 => all numbers are shown side by side ; 
   1 => one number on each side of the current page number ;
   0 => only current page number is shown
*/
const PAGINATION_NEIGHBOURS = 2;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: [],
      categories: [],
      productsInfo: [],
      currentProducts: [],
      currentPage: null,
      totalPages: null,
      totalProducts: 0
    };
  }

  async componentDidMount() {
    try {
      const { getAllData } = this.props;
      await getAllData();

      const userData = JSON.parse(localStorage.getItem("user"));
      this.setState({
        loading: false,
        user: userData,
        categories: this.props.categories,
        productsInfo: this.props.products,
        totalProducts: this.props.products.length
      });
    } catch (error) {
      console.log(error); // for dev purpose
    }
  }

  onPageChanged = data => {
    const { productsInfo } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const productsList = productsInfo;
    const currentProducts = productsList.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentProducts, totalPages });
  };

  render() {
    const {
      loading,
      user,
      categories,
      currentProducts,
      totalProducts,
      currentPage,
      totalPages
    } = this.state;

    if (!loading) {
      return (
        <div className="p-6 bg-purple-700">
          <div className="flex flex-col w-full font-sans bg-white">
            <div className="container px-8 mx-auto">
              <Header />

              <main className="flex flex-col-reverse items-center py-8 sm:flex-row jusitfy-between">
                <div className="flex flex-col items-center w-full text-center sm:items-start sm:text-left">
                  <h1 className="mb-2 text-6xl font-bold leading-none tracking-wide text-blue-900">
                    Hello {user.firstname}
                  </h1>
                  <h2 className="mb-6 text-4xl tracking-widest text-orange-500">
                    Everything you need.
                  </h2>
                </div>
                <SVGIcon
                  src={dashboardSVG}
                  cls="absolute right-0 z-auto hidden h-64 max-w-xs mr-32 lg:flex"
                />
                <div className="mt-8 mb-16 sm:mb-0 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
              </main>
              <Carousel />

              {/* testing purpose */}
              <h2 className="text-lg">
                <strong>{totalProducts}</strong> products available in the
                database
              </h2>
              {/* ***** */}

              {currentPage > 0 && (
                <span className="inline-block h-full">
                  Page <span className="font-bold">{currentPage}</span> /{" "}
                  <span className="font-bold">{totalPages}</span>
                </span>
              )}

              {totalProducts > 0 && (
                <div>
                  <h1 className="mb-8 text-3xl font-thin tracking-wide text-center">
                    Explore & Choose
                  </h1>

                  <div className="my-12">
                    <ListCategories categories={categories} />
                  </div>

                  <div>
                    <ArticlesList products={currentProducts} />
                  </div>
                </div>
              )}

              {totalProducts === 0 && (
                <div>
                  <h1 className="mb-8 text-3xl font-thin tracking-wide text-center">
                    Quickly add a product{" "}
                    <a
                      className="font-medium text-gray-700 hover:text-gray-900"
                      href="/sales"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                  </h1>

                  <Quote
                    name="Cole Sear (The Sixth Sense)"
                    quote="I see dead articles... They don't know they are dead."
                  />
                </div>
              )}

              <div className="flex">
                <PaginationComp
                  totalRecords={totalProducts}
                  pageLimit={ARTICLES_PER_PAGE}
                  pageNeighbours={PAGINATION_NEIGHBOURS}
                  onPageChanged={this.onPageChanged}
                />
              </div>
            </div>

            <Footer />
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  errorCategories: state.categories.error,
  products: state.products.products,
  errorProducts: state.products.error
});

function mapDispatchToProps(dispatch) {
  return {
    getAllData: data => dispatch(getAllData(data)),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
