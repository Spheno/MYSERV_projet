import React from "react";

class ErrorPage extends React.Component {
  render() {
    return (
      <div className="p-6 bg-purple-700">
        <div className="bg-white flex flex-col font-sans">
          <div className="container mx-auto px-8">
            <header className="flex flex-col sm:flex-row items-center justify-between py-6 relative">
              <h3 className="text-2xl font-bold text-blue-900">ShooFly</h3>
              <nav className="hidden md:flex text-lg">
                <a
                  href="/"
                  className="text-gray-800 hover:text-purple-300 py-3 px-6"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="text-gray-800 hover:text-purple-300 py-3 px-6"
                >
                  Signup
                </a>
                <button
                  href="#top"
                  className="bg-purple-200 hover:bg-purple-300 rounded-full uppercase text-purple-700 py-3 px-6"
                >
                  Contact
                </button>
              </nav>
              <button className="flex md:hidden flex-col absolute top-0 right-0 p-4 mt-5">
                <span className="w-5 h-px mb-1 bg-orange-500"></span>
                <span className="w-5 h-px mb-1 bg-orange-500"></span>
                <span className="w-5 h-px mb-1 bg-orange-500"></span>
              </button>
            </header>

            <main className="flex flex-col-reverse sm:flex-row jusitfy-between items-center py-8">
              <div className="sm:w-4/5 flex flex-col items-center sm:items-start text-center sm:text-left">
                <h1 className="text-6xl text-blue-900 font-bold leading-none tracking-wide mb-2">
                  Seems like you're lost
                </h1>
                <h2 className="text-4xl text-orange-500 text-secondary tracking-widest mb-6">
                  Oopsie.
                </h2>
              </div>
              <div className="mb-16 sm:mb-0 mt-8 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
            </main>

            <div className="flex justify-center px-6 mb-12">
              <div className="w-full xl:w-3/4 lg:w-12/12 flex">
                <div className="w-full h-auto hidden lg:block bg-cover rounded-l-lg">
                    <img alt="Error 404" src ="https://source.unsplash.com/K4mSJ7kc0As/600x800" />
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
