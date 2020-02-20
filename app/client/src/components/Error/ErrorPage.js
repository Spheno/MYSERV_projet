import React from "react";
import SVGIcon from "../SVG/SVGIcon";
import error404SVG from "../../images/404.svg";

class ErrorPage extends React.Component {
  render() {
    return (
      <div className="p-6 bg-purple-700">
        <div className="flex flex-col font-sans bg-white">
          <div className="container px-8 mx-auto">
            <header className="relative flex flex-col items-center justify-between py-6 sm:flex-row">
              <h3 className="text-2xl font-bold text-blue-900">ShooFly</h3>
              <nav className="hidden text-lg md:flex">
                <a
                  href="/"
                  className="px-6 py-3 text-gray-800 hover:text-purple-300"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="px-6 py-3 text-gray-800 hover:text-purple-300"
                >
                  Signup
                </a>
                <button
                  href="#top"
                  className="px-6 py-3 text-purple-700 uppercase bg-purple-200 rounded-full hover:bg-purple-300"
                >
                  Contact
                </button>
              </nav>
              <button className="absolute top-0 right-0 flex flex-col p-4 mt-5 md:hidden">
                <span className="w-5 h-px mb-1 bg-orange-500"></span>
                <span className="w-5 h-px mb-1 bg-orange-500"></span>
                <span className="w-5 h-px mb-1 bg-orange-500"></span>
              </button>
            </header>

            <main className="flex flex-col-reverse items-center pt-8 sm:flex-row jusitfy-between">
              <div className="flex flex-col items-center text-center sm:w-4/5 sm:items-start sm:text-left">
                <h1 className="mb-2 text-6xl font-bold leading-none tracking-wide text-blue-900">
                  Seems like you're lost
                </h1>
                <h2 className="text-4xl tracking-widest text-orange-500 text-secondary">
                  Oopsie.
                </h2>
              </div>
              <div className="mt-8 mb-16 sm:mb-0 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
            </main>

            <div className="flex justify-center px-6">
              <div className="flex w-full xl:w-3/4 lg:w-12/12">
                <div className="w-full h-auto bg-cover rounded-l-lg lg:block">
                  <SVGIcon
                    src={error404SVG}
                    cls="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
