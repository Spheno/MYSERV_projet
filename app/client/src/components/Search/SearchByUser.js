import React from "react";

import API from "../../utils/searchAPI";
import LoaderScreen from "../Loader/LoaderScreen";
import SVGIcon from "../SVG/SVGIcon";

import notFound from "../../images/notFound.svg";
import UserAvatar from "./UserAvatar";

export default class SearchByUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      users: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await API.searchByUser(this.props.userName);
      console.log("res", response);
      this.setState({
        loading: false,
        users: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { loading, users } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      return (
        <>
          <div className="px-2 py-3 mt-0">
            <h2 className="flex-1 text-2xl font-bold tracking-wide text-gray-800 uppercase">
              Users
            </h2>
            <p className="flex-1 text-lg tracking-wide text-gray-600 uppercase">
              ({users.length} user(s) found)
            </p>
          </div>

          <div className="flex flex-wrap items-stretch justify-center">
            {users.length === 0 && (
              <SVGIcon src={notFound} cls="h-64 max-w-xs flex" />
            )}

            {users.length > 0 && (
              <div className="w-full max-w-screen-xl p-6">
                <div className="max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
                  <div className="px-2 py-4 sm:flex sm:items-center">
                    <div className="w-full">
                      {users.map((user, index) => {
                        return (
                          <div className="mb-4" key={index}>
                            <UserAvatar user={user} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      );
    }
  }
}
