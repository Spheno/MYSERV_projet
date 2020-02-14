import React from "react";
import API from "../../utils/API";

import PhoneInput, {
  isPossiblePhoneNumber, /* only checks for input length (for testing purpose in our case) */
  isValidPhoneNumber, /* checks the validity of the number (for later on) */
} from "react-phone-number-input";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "Test",
      lastname: "Test",
      email: "test@test.fr",
      phoneNumber: "+21612345678",
      password: "test"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnChangePhoneNumber = this.handleOnChangePhoneNumber.bind(this);
  }

  send = async () => {
    const { firstname, lastname, email, phoneNumber, password } = this.state;
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
        password
      });
      alert(data);
      localStorage.setItem("token", data.token);
      window.location = "/dashboard";
    } catch (error) {
      console.log("POST axios request failed!");
      console.log(error);
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
      <div className="bg-gray-300 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-6 rounded shadow-md text-black w-full">
            <h1 className="mb-4 text-3xl text-center">Join us!</h1>
            <form method="post" onSubmit={this.send}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="firstname"
                placeholder="First name"
                value={this.state.firstname}
                onChange={this.handleChange}
                required
              />
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="lastname"
                placeholder="Last name"
                value={this.state.lastname}
                onChange={this.handleChange}
                required
              />

              <PhoneInput
                className="border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Phone number"
                value={this.state.phoneNumber}
                onChange={this.handleOnChangePhoneNumber}
                required
                error={
                  /* isValidPhoneNumber(this.state.phoneNumber) */
                  isPossiblePhoneNumber(this.state.phoneNumber)
                    ? null
                    : "Invalid phone number"
                }
              />

              <input
                type="email"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
                autoComplete="true"
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>

            <div className="text-center text-sm text-gray-600 mt-4">
              By signing up, you agree to the{" "}
              <a
                className="no-underline border-b border-gray-700 text-gray-600"
                href="#top"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                className="no-underline border-b border-gray-700 text-gray-600"
                href="#top"
              >
                Privacy Policy
              </a>{" "}
            </div>
          </div>

          <div className="text-gray-600 my-4">
            Already have an account?{" "}
            <a
              className="no-underline border-b border-blue-700 text-blue-700"
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
