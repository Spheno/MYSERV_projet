import React from "react";
import API from "../../../../utils/userAPI";
import LoaderScreen from "../../../Loader/LoaderScreen";
import { ToastContainer, toast } from "react-toastify";

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      id: "",
      firstName: "",
      lastName: "",
      oldPassword: "",
      password: "",
      cPassword: ""
    };

    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCPasswordChange = this.handleCPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = async e => {
    const authorData = JSON.parse(localStorage.getItem("user"));
    const userID = authorData._id;

    try {
      const response = await API.getUser(userID);
      this.setState({
        loading: false,
        id: response._id,
        firstName: response.firstname,
        lastName: response.lastname
      });
      console.log("response", response);
    } catch (err) {
      console.log("error compDidMount account settings", err);
    }
  };

  handleFirstnameChange = e => {
    this.setState({ firstName: e.target.value });
  };
  handleLastnameChange = e => {
    this.setState({ lastName: e.target.value });
  };
  handleOldPasswordChange = e => {
    this.setState({ oldPassword: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };
  handleCPasswordChange = e => {
    this.setState({ cPassword: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    let {
      id,
      firstName,
      lastName,
      oldPassword,
      password,
      cPassword
    } = this.state;

    if (password !== cPassword) {
      alert("Password and confirmation are not the same");
      this.setState({ password: "", cPassword: "" });
      return false;
    }

    try {
      const response = await API.editUser({
        id,
        firstName,
        lastName,
        oldPassword,
        password
      });
      console.log("response", response);
      toast.success("Saving changes... You can refresh the page")
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Old password is incorrect");
        this.setState({ oldPassword: "" })
      } else {
        toast.error("Error ", error);
      }
    }
  };

  render() {
    let { loading, firstName, lastName } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <ToastContainer />
          </div>
          
          <div
            className="px-4 py-3 text-teal-900 bg-teal-100 border-t-4 border-teal-500 rounded-b shadow"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="w-6 h-6 mr-4 text-teal-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">
                  Old password is required in order to edit your settings.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-8 pt-6 pb-8 my-2 mb-4 bg-white border-gray-300 rounded md:shadow-md md:border">
            <div className="mb-6 -mx-3 md:flex">
              <div className="px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border rounded appearance-none border-red"
                  id="grid-first-name"
                  type="text"
                  value={firstName}
                  onChange={this.handleFirstnameChange}
                />
              </div>
              <div className="px-3 md:w-1/2">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border rounded appearance-none border-gray-lighter"
                  id="grid-last-name"
                  type="text"
                  value={lastName}
                  onChange={this.handleLastnameChange}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex">
              <div className="px-3 md:w-full">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-oldpassword"
                >
                  Old password
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border rounded appearance-none border-grey-lighter"
                  id="grid-oldpassword"
                  autoComplete="true"
                  type="password"
                  placeholder="***************"
                  value={this.state.oldPassword}
                  onChange={this.handleOldPasswordChange}
                  required
                />
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-password"
                >
                  New password
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border rounded appearance-none border-grey-lighter"
                  id="grid-password"
                  autoComplete="true"
                  type="password"
                  placeholder="***************"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-cpassword"
                >
                  Confirm new password
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border rounded appearance-none border-grey-lighter"
                  id="grid-cpassword"
                  autoComplete="true"
                  type="password"
                  placeholder="***************"
                  value={this.state.cPassword}
                  onChange={this.handleCPasswordChange}
                />
              </div>
            </div>
            <div className="my-6 text-center">
              <button
                type="submit"
                className="w-40 py-3 my-1 text-center text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      );
    }
  }
}
