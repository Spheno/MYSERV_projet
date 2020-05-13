import React from "react";

import userAPI from "../../utils/userAPI";
import productAPI from "../../utils//productsAPI";

import LoaderScreen from "../Loader/LoaderScreen";
import { confirmAlert } from "react-confirm-alert"; /* custom confirm pop up */
import AlertDeleteArticle from "../Alerts/AlertDeleteArticle";
import { ToastContainer } from "react-toastify";

import avatarNotFound from "../../images/avatar/avatarNotFound.svg";
import { Link } from "react-router-dom";

export default class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showAlert: false,
      isProduct: true, // soit un commentaire d'un produit, soit d'un profil
      productID: "",
      user: [],
      userID: "",
      review: [],
      isAuthor: false,
      dateOptions: {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      },
      dateFormat: ""
    };
  }

  async componentDidMount() {
    console.log("review", this.props.review);
    if(this.props.productID) this.setState({ productID: this.props.productID });
    if(this.props.userID) this.setState({ userID: this.props.userID });
    
    const visitor = JSON.parse(localStorage.getItem("user"));
    const visitorID = visitor._id;

    if (visitorID === this.props.review.author)
      this.setState({ isAuthor: true });

    try {
      const response = await userAPI.getUser(this.props.review.author, null);
      this.setState({
        loading: false,
        isProduct: this.props.isProduct,
        user: response,
        review: this.props.review,
        dateFormat: new Date(
          Date.UTC(
            new Date(this.props.review.uploadDate).getFullYear(),
            new Date(this.props.review.uploadDate).getMonth(),
            new Date(this.props.review.uploadDate).getUTCDate()
          )
        )
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteProfileComment = async (reviewID, userID) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            this.setState({ showAlert: true });
            try {
              const response = await userAPI.deleteProfileComment(reviewID, userID);
              console.log("response remove comment from profile", response);
            } catch (error) {
              console.log("Error delete comment from profile", error);
            }
          }
        },
        {
          label: "No",
          onClick: () => null
        }
      ]
    });
  };

  deleteProductComment = async (reviewID, productID) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            this.setState({ showAlert: true });
            try {
              const response = await productAPI.deleteProductComment(reviewID, productID);
              console.log("response remove comment from product", response);
            } catch (error) {
              console.log("Error delete comment from product", error);
            }
          }
        },
        {
          label: "No",
          onClick: () => null
        }
      ]
    });
  };

  closeAlert = () => {
    this.setState({ showAlert: false });
  };

  render() {
    let {
      loading,
      isProduct,
      productID,
      showAlert,
      user,
      userID,
      isAuthor,
      review,
      dateOptions,
      dateFormat
    } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      let userName = user.publicName
        ? user.publicName
        : user.firstname + ", " + user.lastname;

      if (
        user.profilePicture[0] &&
        !user.profilePicture[0].path.includes("\\uploads\\") &&
        !user.profilePicture[0].path.includes("/uploads/")
      ) {
        user.profilePicture[0].path = "\\" + user.profilePicture[0].path;
        console.log("new link", user.profilePicture[0].path);
      }

      let avatar = user.profilePicture[0]
        ? user.profilePicture[0].path
        : avatarNotFound;

      if (
        user.profilePicture[0] &&
        !avatar.includes("\\uploads\\") &&
        !avatar.includes("/uploads/")
      ) {
        console.log(avatar.chartAt(0));
        avatar = "\\" + avatar;
        console.log("avatar link changed");
      }

      let dateFormated = new Intl.DateTimeFormat("default", dateOptions).format(
        dateFormat
      );

      return (
        <div className="w-full lg:max-w-full">
          <AlertDeleteArticle
            showAlert={showAlert}
            closeAlert={this.closeAlert.bind(this)}
          />

          <div className="form-group">
            <ToastContainer />
          </div>

          <div className="relative flex p-3 leading-normal bg-white border border-gray-400 rounded shadow">
            {isAuthor && isProduct && (
              <button
                className="absolute top-0 right-0 m-2"
                onClick={() =>
                  this.deleteProductComment(review._id, productID)
                }
              >
                <svg
                  className="w-6 h-6 text-red-500 fill-current"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </button>
            )}

            {isAuthor && !isProduct && (
              <button
                className="absolute top-0 right-0 m-2"
                onClick={() => this.deleteProfileComment(review._id, userID)}
              >
                <svg
                  className="w-6 h-6 text-red-500 fill-current"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </button>
            )}

            <div className="flex-shrink-0">
              <div className="relative inline-block">
                <div className="relative w-16 h-16 overflow-hidden rounded-full">
                  <img
                    className="absolute top-0 left-0 object-cover w-full h-full bg-cover object-fit"
                    src={avatar}
                    alt="Profile avatar"
                  />
                  <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                </div>
              </div>
            </div>
            <div className="ml-6">
              <p className="flex items-baseline">
                <Link
                  className="font-bold text-gray-600"
                  to={{
                    pathname: "/user/" + review.author,
                    state: { user: user }
                  }}
                >
                  {userName}
                </Link>
                <span className="ml-4 text-sm text-gray-600">
                  {dateFormated}
                </span>
              </p>
              <div className="flex items-center mt-1">
                {Array.from(Array(review.ratings), (e, i) => {
                  return (
                    <svg
                      key={"yelloStar" + i}
                      className="w-4 h-4 text-yellow-600 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  );
                })}
                {Array.from(Array(5 - review.ratings), (e, i) => {
                  return (
                    <svg
                      key={"greyStar" + i}
                      className="w-4 h-4 text-gray-400 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  );
                })}
              </div>

              <div className="mt-3">
                <span className="font-bold">{review.title}</span>
                <p className="mt-1">{review.content}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
