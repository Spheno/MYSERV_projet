import React from "react";

import Header from "../Header/Header";
import SVGIcon from "../SVG/SVGIcon";
import Carousel from "../Header/Carousel";
import ArticlesList from "../Articles/ArticlesList";
import Footer from "../Footer/Footer";

import dashboardSVG from "../../images/dashboard.svg";
import ListCategories from "../Categories/ListCategories";

import API from "../../utils/categoriesAPI";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      categories: []
    };
  }

  async componentDidMount() {
    try {
      const categoriesList = await API.getCategories();
      this.setState({ categories: categoriesList.data });
    }
    catch(error) {
      console.log(error); // for dev purpose
    }
  }

  render() {
    return (
      <div className="p-6 bg-purple-700">
        <div className="flex flex-col w-full font-sans bg-white">
          <div className="container px-8 mx-auto">
            <Header />

            <main className="flex flex-col-reverse items-center py-8 sm:flex-row jusitfy-between">
              <div className="flex flex-col items-center w-full text-center sm:items-start sm:text-left">
                <h1 className="mb-2 text-6xl font-bold leading-none tracking-wide text-blue-900">
                  Hello {localStorage.getItem("username")}
                </h1>
                <h2 className="mb-6 text-4xl tracking-widest text-orange-500 text-secondary">
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

            <h1 className="mb-8 text-3xl font-thin tracking-wide text-center">
              Explore & Choose
            </h1>
            <ListCategories categories={this.state.categories} />
            <ArticlesList />
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
