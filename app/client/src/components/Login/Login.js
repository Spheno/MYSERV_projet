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
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnChangePhoneNumber = this.handleOnChangePhoneNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { phoneNumber, password } = this.state;
    if (!phoneNumber || phoneNumber.length === 0) return;
    if (!password || password.length === 0) return;

    try {
      const { data } = await API.login(phoneNumber, password);

      alert("Connexion réussie !");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.session);
      window.location = "/dashboard";
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log("Status code: ", error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error ", error.message);
      }

      alert(error.response.data.text);
      this.setState({ password: "" });
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

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({ phoneNumber: user.phoneNumber });
    }
  }

  render() {
    return (
      <>
        <div className="p-6 bg-purple-700">
          <div className="flex flex-col font-sans bg-white">
            <div className="container px-8 mx-auto">
              <header className="relative flex flex-col items-center justify-between py-6 sm:flex-row">
                <h3 className="text-3xl font-bold text-blue-900">ShooFly</h3>
              </header>

              <main className="block md:flex">
                <div className="flex flex-col-reverse items-center w-full py-8 mx-auto sm:w-1/2 sm:flex-row jusitfy-between">
                  <div className="flex flex-col items-center w-full text-center md:w-4/5 md:items-start md:text-left">
                    <h1 className="mb-2 text-6xl font-bold leading-none tracking-wide text-blue-900 uppercase">
                      Buy, Sell, Go.
                    </h1>
                    <h2 className="mb-6 text-4xl tracking-widest text-orange-500 text-secondary">
                      You will come back.
                    </h2>
                  </div>
                </div>

                <div className="flex justify-center w-full mx-auto mb-12 sm:w-1/2">
                  <div className="flex-1 px-24 border-purple-400 rounded-lg">
                    <div className="sounded-lg lg:rounded-l-none">
                      <h3 className="pt-8 text-2xl text-center">Hello you</h3>
                      <form
                        className="pt-6 pb-8 mb-4 bg-white rounded"
                        onSubmit={this.handleSubmit}
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
                            href="/reset"
                          >
                            Forgot your password?
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
