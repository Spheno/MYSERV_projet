import React from "react";
import API from "../../utils/userAPI";

import PhoneInput, {
  isPossiblePhoneNumber /* only checks for input length (for testing purpose in our case) */,
  isValidPhoneNumber /* checks the validity of the number (for later on) */
} from "react-phone-number-input";
import HoverBtn from "../Buttons/HoverBtn";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      password: "",
      codeParrain: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnChangePhoneNumber = this.handleOnChangePhoneNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      codeParrain
    } = this.state;
    if (!firstname || firstname.length === 0) return;
    if (!lastname || lastname.length === 0) return;
    if (!email || email.length === 0) return;
    if (!password || password.length === 0) return;

    try {
      // alert(JSON.stringify(this.state));
      const { data } = await API.signup({
        firstname,
        lastname,
        email,
        phoneNumber,
        password,
        codeParrain
      });

      alert("Inscription réussie ! Bienvenue " + firstname);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.session);
      window.location = "/";
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
      <div className="flex flex-col bg-gray-300">
        <div className="container flex flex-col items-center justify-center flex-1 max-w-lg min-h-screen px-2 mx-auto">
          <div className="w-full px-6 pt-4 pb-6 mt-3 text-black bg-white rounded shadow-md">
            <h1 className="mb-4 text-3xl text-center">Join us!</h1>
            <form method="post" onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                name="firstname"
                placeholder="First name *"
                value={this.state.firstname}
                onChange={this.handleChange}
                required
              />
              <input
                type="text"
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                name="lastname"
                placeholder="Last name *"
                value={this.state.lastname}
                onChange={this.handleChange}
                required
              />

              <PhoneInput
                className="w-full p-3 mb-4 border rounded border-grey-light"
                placeholder="Phone number *"
                value={this.state.phoneNumber}
                onChange={this.handleOnChangePhoneNumber}
                required
              />

              <input
                type="email"
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                name="email"
                placeholder="Email *"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <input
                type="password"
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                name="password"
                placeholder="Password *"
                value={this.state.password}
                onChange={this.handleChange}
                required
                autoComplete="true"
              />
              <div className="flex">
                <HoverBtn
                  icon={
                    <svg
                      className="w-5 h-5 mt-4 mr-4 text-teal-500 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  }
                  text="Win money you can spend on ShooFly with your friend"
                />

                <input
                  type="text"
                  className="flex-1 p-3 mb-4 border rounded border-grey-light"
                  name="codeParrain"
                  placeholder="Code parrain"
                  value={this.state.codeParrain}
                  onChange={this.handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 my-1 text-center text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
              >
                Create Account
              </button>
            </form>
            <hr className="my-4 border-t" />
            <div className="mt-4 text-sm text-center text-gray-600">
              By signing up, you agree to the{" "}
              <a
                className="text-gray-600 no-underline border-b border-gray-700 hover:text-gray-900"
                href="#top"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                className="text-gray-600 no-underline border-b border-gray-700 hover:text-gray-900"
                href="#top"
              >
                Privacy Policy
              </a>{" "}
            </div>
          </div>

          <div className="my-4 text-gray-600">
            Already have an account?{" "}
            <a
              className="text-blue-600 no-underline border-b border-blue-700 hover:text-blue-900"
              href="/"
            >
              Log in
            </a>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
