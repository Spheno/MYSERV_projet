import React from "react";
import LoaderScreen from "../../../Loader/LoaderScreen";
import NavTabs from "../../../Navigation/NavTabs";
import ProfileBio from "./ProfileBio";
import ProfileSales from "./ProfileSales";
import ProfileReviews from "./ProfileReviews";

import userAPI from "../../../../utils/userAPI";

import avatarNotFound from "../../../../images/avatar/avatarNotFound.svg";

export default class ProfileDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isAuthor: false,
      user: []
    };
  }

  componentDidMount = async e => {
    const authorData = JSON.parse(localStorage.getItem("user"));
    const userID = authorData._id;

    const profileUserID = this.props.profileUserID;
    if(profileUserID === userID) {
        this.setState({ isAuthor: true })
    }

    try {
      const response = await userAPI.getUser(profileUserID, null);
      this.setState({
        loading: false,
        user: response
      });
      console.log("user", response);
    } catch (err) {
      console.log("error compDidMount account settings", err);
    }
  };

  render() {
    let { loading, isAuthor, user } = this.state;
    let avatar = avatarNotFound;
    if (user.profilePicture && user.profilePicture.length > 0)
      avatar = user.profilePicture[0].path;

    let location = "No defined location.";
    if (user.city && user.country) location = user.city + ", " + user.country;

    let username = user.firstname + ", " + user.lastname;
    if(user.publicName) username += " (" + user.publicName + ")";

    console.log("avatar", avatar)

    if (loading) {
      return <LoaderScreen />;
    } else {
      return (
        <div className="flex flex-col pb-16 my-2 mb-4 bg-white border-gray-300 rounded md:shadow-md md:border">
          <div className="relative pt-16 pb-6 mb-8 bg-blue-400 shadow-lg">
            {/* avatar, nom public, infos persos, réseaux sociaux CENTRE */}
            <div className="max-w-lg mx-auto">
              <img
                src={avatar}
                className="w-32 h-32 mx-auto border rounded-full shadow-xl"
                alt="avatar"
              />
              <h1 className="pt-4 text-4xl font-semibold tracking-tight text-center">
                {username}
              </h1>
              <h2 className="pb-4 text-xl font-light text-center">
                {location}
              </h2>
              <div className="absolute top-0 right-0 mt-6 mr-6">
                <div className="flex flex-wrap justify-center p-4">
                  {user.linkFB && (
                    <a
                      className="px-2"
                      href={"https://www.facebook.com/" + user.linkFB + "/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="h-6 text-gray-600 fill-current hover:text-teal-700"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Facebook</title>
                        <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
                      </svg>
                    </a>
                  )}
                  {user.linkInstagram && (
                    <a
                      className="px-2"
                      href={
                        "https://www.instagram.com/" + user.linkInstagram + "/"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="h-6 text-gray-600 fill-current hover:text-teal-700"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Instagram</title>
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* onglets pour naviguer: bio, produits en vente, commentaires sur son profil */}
          <div>
            <NavTabs
              tabtitles={["Bio", "Current products", "Reviews"]}
              contents={[
                <ProfileBio bio={user.bio} />,
                <ProfileSales phoneNumber={user.phoneNumber} isAuthor={isAuthor} user={user} />,
                <ProfileReviews userID={user._id} isAuthor={isAuthor} />
              ]}
            />
          </div>
        </div>
      );
    }
  }
}
