import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class Sales extends React.Component {
  render() {
    return (
      <div className="p-6 bg-purple-700">
        <div className="bg-white flex flex-col font-sans">
          <div className="container mx-auto px-8">
            <Header />

            <main className="flex flex-col-reverse sm:flex-row jusitfy-between items-center py-8">
              <div className="w-full flex flex-col items-center sm:items-start text-center sm:text-left">
                <h1 className="text-6xl text-blue-900 font-bold leading-none tracking-wide mb-2">
                  Your sales
                </h1>
                <h2 className="text-4xl text-orange-500 text-secondary tracking-widest mb-6">
                  Follow your transactions.
                </h2>
              </div>
              <div className="mb-16 sm:mb-0 mt-8 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
            </main>

            
          </div>

          <Footer/>
        </div>
      </div>
    );
  }
}

export default Sales;
