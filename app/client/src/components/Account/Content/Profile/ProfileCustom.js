import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarProfile from "./AvatarProfile";

export default class ProfileCustom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      img: null
    };
  }

  /* TODO
  Get img from database and put it in this.state.img
  */

  render() {
    return (
      <form /*onSubmit={this.send}*/>
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
                <AvatarProfile img={this.state.img} />
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
                placeholder="Profile name"
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
              />
            </div>
          </div>

          <div className="mt-2">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="street"
            >
              Address <FontAwesomeIcon icon="map-marker-alt" size="1x" />
            </label>
            <input
              className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
              id="street"
              name="street"
              type="text"
              placeholder="Street"
              aria-label="Street"
            />
          </div>
          <div className="mt-2">
            <label
              className="hidden block text-sm text-gray-600"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
              id="city"
              name="city"
              type="text"
              required=""
              placeholder="City"
              aria-label="City"
            />
          </div>
          <div className="flex mb-2">
            <div className="inline-block w-1/2 pr-1 mt-2">
              <label
                className="hidden block text-sm text-gray-600"
                htmlFor="country"
              >
                Country
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
                id="country"
                name="country"
                type="text"
                required=""
                placeholder="Country"
                aria-label="Country"
              />
            </div>
            <div className="inline-block w-1/2 pl-1 mt-2 -mx-1">
              <label
                className="hidden block text-sm text-gray-600"
                htmlFor="zipCode"
              >
                Zip
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
                id="zipCode"
                name="zipCode"
                type="text"
                required=""
                placeholder="Zip"
                aria-label="Zip code"
              />
            </div>
          </div>

          <div className="flex content-center my-6 text-center">
            <div className="w-1/2">
              <a
                className="px-4 py-3 my-1 text-white bg-teal-500 border border-blue-500 rounded hover:bg-teal-700 focus:outline-none"
                href="#top"
              >
                Check your profile
              </a>
            </div>
            <div className="w-1/2">
              <button
                type="submit"
                className="w-40 py-3 -mt-4 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
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
