import React from "react";
import LoaderScreen from "../Loader/LoaderScreen";

import avatarNotFound from "../../images/avatar/avatarNotFound.svg";
import { Link } from "react-router-dom";

export default class UserAvatar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: false, user: this.props.user });
  }

  render() {
    let { loading, user } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      console.log("user", user);

      return (
        <>
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10">
              {user.profilePicture.length === 0 && (
                <img
                  className="w-10 h-10 rounded-full"
                  src={avatarNotFound}
                  alt="avatar not found"
                />
              )}
              {user.profilePicture.length > 0 && (
                <img
                  className="w-10 h-10 rounded-full"
                  src={"/" + user.profilePicture[0].path}
                  alt="avatar"
                />
              )}
            </div>
            <div className="ml-4">
              <Link
                to={{
                  pathname: "/user/" + user._id,
                  state: { user: user },
                }}
              >
                <div className="text-sm font-medium leading-5 text-gray-900">
                  {user.firstname} {user.lastname}
                </div>
              </Link>
              <div className="text-sm leading-5 text-gray-500">
                {user.publicName || "No public name"}
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}
