import React from "react";
import API from "../../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
            <header className="flex flex-col sm:flex-row items-center justify-between py-6 relative">
              <h3 className="text-2xl font-bold text-blue-900">ShooFly</h3>
              <nav className="hidden md:flex text-lg">
                <a
                  href="#top"
                  className="text-gray-800 hover:text-purple-300 py-3 px-6"
                >
                  Home
                </a>
                <div className="group inline-block relative">
                  <button className="text-gray-800 hover:text-purple-300 py-3 px-4 inline-flex items-center">
                    <span className="mr-1">My account</span>
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </button>
                  <ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
                    <li className="">
                      <a
                        className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="#top"
                      >
                        <FontAwesomeIcon icon="user" className="mr-2" />Profile
                      </a>
                    </li>
                    <li className="">
                      <a
                        className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="#top"
                      >
                        <FontAwesomeIcon icon="shopping-cart" className="mr-2" />Cart
                      </a>
                    </li>
                    <li className="">
                      <a
                        className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="#top"
                      >
                        <FontAwesomeIcon icon="heart" className="mr-2" />Favs
                      </a>
                    </li>
                    <li className="">
                      <a
                        className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="#top"
                      >
                        <FontAwesomeIcon icon="cogs" className="mr-2" />Settings
                      </a>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={this.disconnect}
                  className="bg-purple-200 hover:bg-purple-300 rounded-full uppercase text-purple-700 py-3 px-6"
                >
                  Logout
                </button>
              </nav>
              <button className="flex md:hidden flex-col absolute top-0 right-0 p-4 mt-5">
                <span className="w-5 h-px mb-1 bg-orange-500"></span>
                <span className="w-5 h-px mb-1 bg-orange-500"></span>
                <span className="w-5 h-px mb-1 bg-orange-500"></span>
              </button>
            </header>

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

            <div className="my-16">
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
