import React from "react";

import Header from "../Header/Header";
import SVGIcon from "../SVG/SVGIcon";
import Carousel from "../Header/Carousel";
import ArticlesList from "../Articles/ArticlesList";
import Footer from "../Footer/Footer";

import dashboardSVG from "../../images/dashboard.svg";
import ListCategories from "../Categories/ListCategories";

import catAPI from "../../utils/categoriesAPI";
import prodAPI from "../../utils/productsAPI";
import Loader from "../Loader/LoaderScreen";
import PaginationComp from "../Pagination/PaginationComp";

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
      const categoriesList = await catAPI.getCategories();
      const productsList = await prodAPI.getProducts();
      const userData = JSON.parse(localStorage.getItem("user"));
      this.setState({
        loading: false,
        user: userData,
        categories: categoriesList.data,
        productsInfo: productsList.data,
        totalProducts: productsList.data.products.length
      });
    } catch (error) {
      console.log(error); // for dev purpose
    }
  }

  onPageChanged = data => {
    const { productsInfo } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const productsList = productsInfo.products;
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

    if (totalProducts === 0) return null;

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

              {currentPage && (
                <span className="inline-block h-full">
                  Page <span className="font-bold">{currentPage}</span> /{" "}
                  <span className="font-bold">{totalPages}</span>
                </span>
              )}
              {/* ***** */}

              <h1 className="mb-8 text-3xl font-thin tracking-wide text-center">
                Explore & Choose
              </h1>

              <div className="my-12">
                <ListCategories categories={categories} />
              </div>

              <div>
                <ArticlesList products={currentProducts} />
              </div>

              <div className="flex">
                <PaginationComp
                  totalRecords={totalProducts}
                  pageLimit={2}
                  pageNeighbours={2}
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

export default Dashboard;
