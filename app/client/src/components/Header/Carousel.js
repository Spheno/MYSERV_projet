import React from "react";
import PurpleBG from "../Graphics/PurpleBG";

class Carousel extends React.Component {
  render() {
    return (
      <div className="mx-auto m-10">
        <div
          className="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl"
          style={{ minHeight: "19rem" }}
        >
          <div
            className="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"
            style={{ minHeight: "19rem" }}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover object-center"
              src="https://stripe.com/img/v3/payments/overview/photos/missguided.jpg"
              alt=""
            />
            {/* calque violet pour ressembler à la charte graphique du site */}
            <PurpleBG />
            <div className="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white">
              <h2 className="text-6xl font-serif tracking-tight">ShooFly</h2>
            </div>
          </div>
          <div className="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
            <div className="p-12 md:pr-24 md:pl-16 md:py-12">
              <p className="text-gray-600">
                <span className="text-gray-900">Shoofly</span> is a Tunisian
                e-commerce platform that has started as an internship project in
                M'saken, Tunisia. Now they deliver seamless checkout across mobile and
                web for customers in 100+ countries.
              </p>
              <a
                className="flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900"
                href="#top"
              >
                <span>Learn more about our company</span>
                <span className="text-xs ml-1">&#x279c;</span>
              </a>
            </div>
            <svg
              className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
          </div>
          <button className="absolute top-0 mt-32 left-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -ml-6 focus:outline-none focus:shadow-outline">
            <span className="block" style={{ transform: "scale(-1)" }}>
              &#x279c;
            </span>
          </button>
          <button className="absolute top-0 mt-32 right-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -mr-6 focus:outline-none focus:shadow-outline">
            <span className="block" style={{ transform: "scale(1)" }}>
              &#x279c;
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
