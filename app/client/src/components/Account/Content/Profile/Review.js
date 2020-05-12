import React from "react";

import API from "../../../../utils/userAPI";
import LoaderScreen from "../../../Loader/LoaderScreen";

import avatarNotFound from "../../../../images/avatar/avatarNotFound.svg";

export default class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: [],
      review: []
    };
  }

  async componentDidMount() {
    console.log("review", this.props.review);

    try {
      const response = await API.getUser(this.props.review.author, null);
      this.setState({
        loading: false,
        user: response,
        review: this.props.review
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { loading, user, review } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      let userName = user.publicName
        ? user.publicName
        : user.firstname + ", " + user.lastname;

      if (
        user.profilePicture[0] &&
        user.profilePicture[0].path.charAt(0) !== "/"
      )
        user.profilePicture[0].path = "\\" + user.profilePicture[0].path;

      let avatar = user.profilePicture[0]
        ? user.profilePicture[0].path
        : avatarNotFound;

      console.log("avatar comment", avatar);

      return (
        <div className="flex items-start my-4">
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
              <span className="font-bold text-gray-600">{userName}</span>
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
      );
    }
  }
}
