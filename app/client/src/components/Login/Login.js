import React from "react";
import API from "../../utils/userAPI";
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
          <div className="flex flex-col font-sans bg-white">
            <div className="container px-8 mx-auto">
              <header className="relative flex flex-col items-center justify-between py-6 sm:flex-row">
                <h3 className="text-2xl font-bold text-blue-900">ShooFly</h3>
                <nav className="hidden text-lg md:flex">
                  <a
                    href="#top"
                    className="px-6 py-3 text-gray-800 hover:text-purple-300"
                  >
                    About
                  </a>
                  <a
                    href="#top"
                    className="px-6 py-3 text-gray-800 hover:text-purple-300"
                  >
                    Contact
                  </a>
                  <a
                    href="/signup"
                    className="px-6 py-3 text-purple-700 uppercase bg-purple-200 rounded-full hover:bg-purple-300"
                  >
                    Join us!
                  </a>
                </nav>
                <button className="absolute top-0 right-0 flex flex-col p-4 mt-5 md:hidden">
                  <span className="w-5 h-px mb-1 bg-orange-500"></span>
                  <span className="w-5 h-px mb-1 bg-orange-500"></span>
                  <span className="w-5 h-px mb-1 bg-orange-500"></span>
                </button>
              </header>

              <main className="flex flex-col-reverse items-center py-8 sm:flex-row jusitfy-between">
                <div className="flex flex-col items-center text-center sm:w-2/5 sm:items-start sm:text-left">
                  <h1 className="mb-2 text-6xl font-bold leading-none tracking-wide text-blue-900 uppercase">
                    Buy, Sell, Go.
                  </h1>
                  <h2 className="mb-6 text-4xl tracking-widest text-orange-500 text-secondary">
                    You will come back.
                  </h2>
                </div>
                <div className="mt-8 mb-16 sm:mb-0 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
              </main>

              <div className="flex justify-center px-6 mb-12">
                <div className="flex w-full border border-purple-400 rounded-lg xl:w-3/4 lg:w-11/12">
                  <div className="hidden w-full h-auto bg-gray-400 bg-cover rounded-l-lg login_side_img lg:block lg:w-1/2">
                    {/* change bg-img in login.css */}
                  </div>
                  <div className="w-full p-5 bg-white rounded-lg lg:w-1/2 lg:rounded-l-none">
                    <h3 className="pt-4 text-2xl text-center">Hello you</h3>
                    <form
                      className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                      onSubmit={this.send}
                    >
                      <PhoneInput
                        className="w-full p-3 mb-4 border rounded border-grey-light"
                        placeholder="Phone number"
                        value={this.state.phoneNumber}
                        onChange={this.handleOnChangePhoneNumber}
                        required
                      />
                      <div className="mb-4">
                        <input
                          type="password"
                          className="w-full p-3 mb-4 border rounded border-grey-light"
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
                          className="w-full py-3 my-1 text-center text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
                        >
                          Sign in
                        </button>
                      </div>
                      <hr className="my-4 border-t" />
                      <div className="my-4 text-center text-gray-600">
                        No account?{" "}
                        <a
                          className="text-blue-600 no-underline hover:text-blue-900"
                          href="/signup"
                        >
                          Sign up!
                        </a>{" "}
                      </div>
                      <div className="text-center">
                        <a
                          className="text-blue-600 no-underline hover:text-blue-900"
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
