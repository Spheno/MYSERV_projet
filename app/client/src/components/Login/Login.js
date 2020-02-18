import React from "react";
import API from "../../utils/API";
import "../../styles/login.css";

import PhoneInput, {
  isPossiblePhoneNumber /* only checks for input length (for testing purpose in our case) */,
  isValidPhoneNumber /* checks the validity of the number (for later on) */
} from "react-phone-number-input";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: "+21612345678",
      password: "test"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnChangePhoneNumber = this.handleOnChangePhoneNumber.bind(this);
  }

  send = async event => {
    event.preventDefault();
    const { phoneNumber, password } = this.state;
    if (!phoneNumber || phoneNumber.length === 0) return;
    if (!password || password.length === 0) return;

    try {
      const { data } = await API.login(phoneNumber, password);

      alert("Connexion réussie !");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      window.location = "/dashboard";
    } catch (error) {
      if (error.response.status === 401) {
        // utilisateur n'existe pas ou password incorrect
        let error_message = JSON.stringify(error.response.data.text);
        alert(JSON.parse(error_message));
        this.setState({ password: "" });
      } else {
        console.log(error); // for dev purpose
      }
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnChangePhoneNumber = value => {
    this.setState({ phoneNumber: value }, () => {
      console.log(
        this.state.phoneNumber +
          " is possible? " +
          isPossiblePhoneNumber(this.state.phoneNumber)
      );
      console.log(
        this.state.phoneNumber +
          " is valid? " +
          isValidPhoneNumber(this.state.phoneNumber)
      );
    });
  };

  render() {
    return (
      <>
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

              <main className="flex flex-col-reverse sm:flex-row jusitfy-between items-center py-8">
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

              <div className="flex justify-center px-6 mb-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  <div className="login_side_img w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
                    {/* change bg-img in login.css */}
                  </div>
                  <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 className="pt-4 text-2xl text-center">Hello you</h3>
                    <form
                      className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                      onSubmit={this.send}
                    >
                      <PhoneInput
                        className="border border-grey-light w-full p-3 rounded mb-4"
                        placeholder="Phone number"
                        value={this.state.phoneNumber}
                        onChange={this.handleOnChangePhoneNumber}
                        required
                      />
                      <div className="mb-4">
                        <input
                          type="password"
                          className="border border-grey-light w-full p-3 rounded mb-4"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          required
                          autoComplete="true"
                        />
                      </div>

                      <div className="mb-6 text-center">
                        <button
                          type="submit"
                          className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
                        >
                          Sign in
                        </button>
                      </div>
                      <hr className="my-4 border-t" />
                      <div className="text-center text-gray-600 my-4">
                        No account?{" "}
                        <a
                          className="no-underline text-blue-600 hover:text-blue-900"
                          href="/signup"
                        >
                          Sign up!
                        </a>{" "}
                      </div>
                      <div className="text-center">
                        <a
                          className="no-underline text-blue-600 hover:text-blue-900"
                          href="#top"
                        >
                          Forgot your password?
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
