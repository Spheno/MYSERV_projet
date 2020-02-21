import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ProfileCustom extends React.Component {
  render() {
    return (
      <form>
        <div className="flex flex-col px-8 pt-6 pb-8 my-2 mb-4 bg-white border-gray-300 rounded md:shadow-md md:border">
          <div className="mb-6 -mx-3 md:flex">
            <div className="px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-first-name"
              >
                Profile pic
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border rounded appearance-none"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
            </div>
            <div className="px-3 md:w-1/2">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-bio"
              >
                Bio
              </label>
              <textarea
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border rounded appearance-none border-gray-lighter"
                id="grid-bio"
                rows="7"
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
                Facebook <FontAwesomeIcon icon={['fab', 'facebook-square']} size="1x" />
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
                Instagram <FontAwesomeIcon icon={['fab', 'instagram']} size="1x" />
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
                id="grid-insta-link"
                type="text"
                placeholder="Insta account"
              />
            </div>
          </div>

          <div className="mb-2 -mx-3 md:flex">
            <div className="px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-city"
              >
                City
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
                id="grid-city"
                type="text"
                placeholder="Albuquerque"
              />
            </div>
            <div className="px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-state"
              >
                State
              </label>
              <div className="relative">
                <select
                  className="block w-full px-4 py-3 pr-8 text-gray-500 bg-gray-200 border border-gray-200 rounded appearance-none"
                  id="grid-state"
                >
                  <option>New Mexico</option>
                  <option>Missouri</option>
                  <option>Texas</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="px-3 md:w-1/2">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-zip"
              >
                Zip
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
                id="grid-zip"
                type="text"
                placeholder="90210"
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
