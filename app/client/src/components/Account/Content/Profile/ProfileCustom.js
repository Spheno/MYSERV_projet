import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarProfile from "./AvatarProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import userAPI from "../../../../utils/userAPI";
import uploadAPI from "../../../../utils/uploadsAPI";

export default class ProfileCustom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      id: "",
      authorNumber: "",
      profilePicture: null,
      bio: "",
      publicName: "",
      facebookLink: "",
      instaLink: "",
      city: "",
      country: ""
    };

    this.handleBioChange = this.handleBioChange.bind(this);
    this.handlePublicNameChange = this.handlePublicNameChange.bind(this);
    this.handleFacebookLinkChange = this.handleFacebookLinkChange.bind(this);
    this.handleInstaLinkChange = this.handleInstaLinkChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = async e => {
    const authorData = JSON.parse(localStorage.getItem("user"));
    const userID = authorData._id;

    try {
      const response = await userAPI.getUser(userID, null);
      this.setState({
        loading: false,
        authorNumber: response.phoneNumber,
        profilePicture: response.profilePicture || "",
        bio: response.bio || "",
        publicName: response.publicName || "",
        facebookLink: response.linkFB || "",
        instaLink: response.linkInstagram || "",
        city: response.city || "",
        country: response.country || ""
      });
      console.log("response", response);
    } catch (err) {
      console.log("error compDidMount account settings", err);
    }
  };

  handleBioChange = e => {
    this.setState({ bio: e.target.value });
  };
  handlePublicNameChange = e => {
    this.setState({ publicName: e.target.value });
  };
  handleFacebookLinkChange = e => {
    this.setState({ facebookLink: e.target.value });
  };
  handleInstaLinkChange = e => {
    this.setState({ instaLink: e.target.value });
  };
  handleCityChange = e => {
    this.setState({ city: e.target.value });
  };
  handleCountryChange = e => {
    this.setState({ country: e.target.value });
  };
  handlePictureChange = picture => {
    console.log("pic", picture)
    this.setState({ profilePicture: picture });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const {
      authorNumber,
      profilePicture,
      bio,
      publicName,
      facebookLink,
      instaLink,
      city,
      country
    } = this.state;

    let data = new FormData();

    data.set("authorNumber", authorNumber);
    data.set("bio", bio);
    data.set("publicName", publicName);
    data.set("facebookLink", facebookLink);
    data.set("instaLink", instaLink);
    data.set("city", city);
    data.set("country", country);
    
    data.append("avatar", profilePicture);

    for (var pair of data.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    try {
      const response = await uploadAPI.customProfile(data);
      if (response) {
        toast.success("upload success");
        console.log("Response", response);
      }
    } catch (error) {
      toast.error("upload fail", error);
      if (error.response) {
        console.log(error.response.data);
        console.log("Status code: ", error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error ", error.message);
      }
    }
  };

  render() {
    let {
      profilePicture,
      bio,
      publicName,
      facebookLink,
      instaLink,
      city,
      country
    } = this.state;

    return (
      <form>
        <div className="form-group">
          <ToastContainer />
        </div>

        <div className="flex flex-col px-8 pt-6 pb-8 my-2 mb-4 bg-white border-gray-300 rounded md:shadow-md md:border">
          <div className="mb-6 -mx-3 md:flex">
            <div className="px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-first-name"
              >
                Profile pic <FontAwesomeIcon icon="camera" size="1x" />
              </label>
              <div>
                <AvatarProfile
                  img={profilePicture}
                  handlePicture={this.handlePictureChange}
                />
              </div>
            </div>
            <div className="px-3 md:w-1/2">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-bio"
              >
                Bio <FontAwesomeIcon icon="edit" size="1x" />
              </label>
              <textarea
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border rounded appearance-none border-gray-lighter"
                id="grid-bio"
                rows="9"
                type="text"
                placeholder="Your bio..."
                value={bio}
                onChange={this.handleBioChange}
              />
            </div>
          </div>

          <div className="mb-2 -mx-3 md:flex">
            <div className="px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-public-name"
              >
                Public name <FontAwesomeIcon icon="user-circle" size="1x" />
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
                id="grid-public-name"
                type="text"
                name="publicName"
                placeholder="Public name"
                value={publicName}
                onChange={this.handlePublicNameChange}
              />
            </div>
            <div className="px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-fb-link"
              >
                Facebook{" "}
                <FontAwesomeIcon icon={["fab", "facebook-square"]} size="1x" />
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
                id="grid-fb-link"
                type="text"
                placeholder="FB account"
                value={facebookLink}
                onChange={this.handleFacebookLinkChange}
              />
            </div>
            <div className="px-3 md:w-1/2">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-insta-link"
              >
                Instagram{" "}
                <FontAwesomeIcon icon={["fab", "instagram"]} size="1x" />
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
                id="grid-insta-link"
                type="text"
                placeholder="Insta account"
                value={instaLink}
                onChange={this.handleInstaLinkChange}
              />
            </div>
          </div>

          <div className="mb-2 -mx-3 md:flex">
            <div className="px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="city"
              >
                City <FontAwesomeIcon icon="map-marker-alt" size="1x" />
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
                id="city"
                name="city"
                type="text"
                aria-label="City"
                placeholder="City"
                value={city}
                onChange={this.handleCityChange}
              />
            </div>
            <div className="px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="country"
              >
                Country <FontAwesomeIcon icon="map-marker-alt" size="1x" />
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
                id="country"
                type="text"
                name="country"
                aria-label="Country"
                placeholder="Country"
                value={country}
                onChange={this.handleCountryChange}
              />
            </div>
          </div>

          <div className="flex content-center my-6 text-center">
            <div className="w-full">
              <button
                type="submit"
                className="w-40 py-3 -mt-4 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
                onClick={this.handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
