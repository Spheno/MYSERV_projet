import React from "react";

import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SuccessCheckout extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isBackButtonClicked: false }

    this.onBackButtonEvent = this.onBackButtonEvent.bind(this)
  }

  componentDidMount() {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', this.onBackButtonEvent);
  }

   onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!this.state.isBackButtonClicked) {
     this.setState({isBackButtonClicked: true});
     window.location = "/dashboard"
    }
  }

   componentWillUnmount = () => {
    window.removeEventListener('popstate', this.onBackButtonEvent);
  }

  render() {
    return (
      <div className="p-6 bg-purple-700">
        <div className="flex flex-col font-sans bg-white">
          <div className="container px-8 mx-auto">
            <Header />

            <div className="flex flex-col w-full min-h-screen font-sans bg-white">
              <div>
                <div className="bg-gray-200 border shadow-md md:overflow-hidden">
                  <div className="px-4 py-16">
                    <div className="relative w-full text-center md:max-w-2xl md:mx-auto">
                      <h1 className="mb-6 text-xl font-bold leading-tight text-gray-700 sm:text-2xl md:text-5xl">
                        Thank you for your purchase
                      </h1>

                      <p className="text-gray-600 md:text-xl md:px-18">
                        Check your emails, your invoice should arrive soon
                      </p>

                      <div className="absolute bottom-0 right-0 hidden w-40 h-40 -mb-64 -mr-48 bg-blue-800 rounded-full md:block"></div>

                      <div className="absolute top-0 right-0 hidden w-5 h-5 mt-32 -mr-40 bg-yellow-500 rounded-full md:block"></div>
                    </div>

                    <div className="mt-10 text-center">
                      <FontAwesomeIcon
                        icon="check-circle"
                        color="green"
                        size="10x"
                      />
                    </div>
                  </div>

                  <svg
                    className="hidden text-white bg-gray-200 fill-current md:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fillOpacity="1"
                      d="M0,64L120,85.3C240,107,480,149,720,149.3C960,149,1200,107,1320,85.3L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                    ></path>
                  </svg>
                </div>

                <div
                  className="relative z-20 hidden max-w-4xl mx-auto md:block"
                  style={{ marginTop: -500 + "px", borderRadius: 20 + "px" }}
                >
                  <div
                    className="absolute top-0 left-0 w-20 h-20 -mt-16 -ml-10 bg-yellow-500 rounded-full"
                    style={{ zIndex: -1 }}
                  ></div>

                  <div
                    className="absolute top-0 left-0 w-5 h-5 mt-12 -ml-32 bg-blue-500 rounded-full"
                    style={{ zIndex: -1 }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
