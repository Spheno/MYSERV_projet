import React from "react";

import PhoneInput, {
  isPossiblePhoneNumber /* only checks for input length (for testing purpose in our case) */,
  isValidPhoneNumber /* checks the validity of the number (for later on) */
} from "react-phone-number-input";

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      phoneNumber: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnChangePhoneNumber = this.handleOnChangePhoneNumber.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

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
      <div className="flex flex-col min-h-screen bg-gray-300">
        <div className="flex flex-col items-center justify-center flex-1 max-w-lg px-2 mx-auto">
          <div className="w-full px-6 pt-8 pb-2 text-black bg-white rounded shadow-md">
            <h3 className="mb-4 text-3xl text-center">Forgot Your Password?</h3>
            <p className="mb-4 text-sm text-center text-gray-700">
              We get it, stuff happens. Just enter your email address or your
              phone number below and we'll send you a link/code to reset your
              password!
            </p>
            <form
              className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              onSubmit={this.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email address..."
                />
              </div>
              <div className="mb-4">
                <p className="uppercase">or</p>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="phoneNumber"
                >
                  Phone number
                </label>
                <PhoneInput
                  className="w-full p-3 mb-4 border rounded border-grey-light"
                  placeholder="Phone number"
                  value={this.state.phoneNumber}
                  onChange={this.handleOnChangePhoneNumber}
                />
              </div>

              <div className="my-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Reset Password
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="/signup"
                >
                  Create an Account!
                </a>
              </div>
              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="/"
                >
                  Already have an account? Login!
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
