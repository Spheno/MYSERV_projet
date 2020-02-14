import React from "react";
import API from "../../utils/API";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: "",
      password: ""
    };
  }

  send = async () => {
    const { phoneNumber, password } = this.state;
    if (!phoneNumber || phoneNumber.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }
    try {
      const { data } = await API.login(phoneNumber, password);
      localStorage.setItem("token", data.token);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <>
        <div className="bg-purple-800 p-6">
          <div className="bg-white flex flex-col font-sans">
            <div className="container mx-auto px-8">
              <header className="flex flex-col sm:flex-row items-center justify-between py-6 relative">
                <h3 className="text-2xl font-bold text-blue-900">ShooFly</h3>
                <nav className="hidden md:flex text-lg">
                  <a
                    href="#top"
                    className="text-gray-800 hover:text-purple-300 py-3 px-6"
                  >
                    About
                  </a>
                  <a
                    href="#top"
                    className="text-gray-800 hover:text-purple-300 py-3 px-6"
                  >
                    Contact
                  </a>
                  <a
                    href="/signup"
                    className="bg-purple-200 hover:bg-purple-300 rounded-full uppercase text-purple-700 py-3 px-6"
                  >
                    Join us!
                  </a>
                </nav>
                <button className="flex md:hidden flex-col absolute top-0 right-0 p-4 mt-5">
                  <span className="w-5 h-px mb-1 bg-orange-500"></span>
                  <span className="w-5 h-px mb-1 bg-orange-500"></span>
                  <span className="w-5 h-px mb-1 bg-orange-500"></span>
                </button>
              </header>
              <main className="flex flex-col-reverse sm:flex-row jusitfy-between items-center py-12">
                <div className="sm:w-2/5 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <h1 className="uppercase text-6xl text-blue-900 font-bold leading-none tracking-wide mb-2">
                    Buy, Sell, Go.
                  </h1>
                  <h2 className="text-4xl text-orange-500 text-secondary tracking-widest mb-6">
                    You will come back.
                  </h2>
                </div>
                <div className="mb-16 sm:mb-0 mt-8 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
