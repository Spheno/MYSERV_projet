import React from "react";
import API from "../../utils/API";

import Header from "../Header/Header";
import Carousel from "../Header/Carousel";
import ArticlesList from "../Articles/ArticlesList";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: ""
    };

    this.disconnect = this.disconnect.bind(this);
  }

  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  render() {
    return (
      <div className="p-6 bg-purple-700">
        <div className="bg-white flex flex-col font-sans">
          <div className="container mx-auto px-8">
            <Header />

            <main className="flex flex-col-reverse sm:flex-row jusitfy-between items-center py-8">
              <div className="w-full flex flex-col items-center sm:items-start text-center sm:text-left">
                <h1 className="text-6xl text-blue-900 font-bold leading-none tracking-wide mb-2">
                  Hello {localStorage.getItem("username")}
                </h1>
                <h2 className="text-4xl text-orange-500 text-secondary tracking-widest mb-6">
                  Everything you need.
                </h2>
              </div>
              <div className="mb-16 sm:mb-0 mt-8 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
            </main>

            <div>
              <Carousel />

              <h1 className="text-3xl text-center font-thin tracking-wide mb-8">
                Explore & Choose
              </h1>

              <ArticlesList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
