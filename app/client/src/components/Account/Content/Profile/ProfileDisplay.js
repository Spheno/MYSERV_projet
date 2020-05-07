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
      user: []
    };
  }

  componentDidMount = async e => {
    const authorData = JSON.parse(localStorage.getItem("user"));
    const userID = authorData._id;

    try {
      const response = await userAPI.getUser(userID, null);
      this.setState({
        loading: false,
        user: response
      });
      console.log("response", response);
    } catch (err) {
      console.log("error compDidMount account settings", err);
    }
  };

  render() {
    let { loading, user } = this.state;
    let avatar = avatarNotFound;
    if (user.profilePicture && user.profilePicture.length > 0)
      avatar = user.profilePicture.path;

    let location = "No defined location.";
    if (user.city && user.country) location = user.city + ", " + user.country;

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
                {user.publicName || user.firstname + ", " + user.lastname}
              </h1>
              <h2 className="pb-4 text-xl font-light text-center">
                {location}
              </h2>
              <div className="absolute top-0 right-0 border">
                <span>fb</span>
              </div>
            </div>
          </div>

          {/* onglets pour naviguer: bio, produits en vente, commentaires sur son profil */}
          <div>
            <NavTabs
              tabtitles={["Bio", "Current products", "Reviews"]}
              contents={[
                <ProfileBio bio={user.bio} />,
                <ProfileSales phoneNumber={user.phoneNumber} user={user} />,
                <ProfileReviews reviews={user.reviews} />
              ]}
            />
          </div>
        </div>
      );
    }
  }
}
