import React from "react";

export default class AccountSettings extends React.Component {
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
                First Name
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border rounded appearance-none border-red"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
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
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="-mx-3 md:flex">
            <div className="px-3 md:w-full">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border rounded appearance-none border-grey-lighter"
                id="grid-password"
                autoComplete="true"
                type="password"
                placeholder="******************"
              />
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-cpassword"
              >
                Confirm password
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border rounded appearance-none border-grey-lighter"
                id="grid-cpassword"
                autoComplete="true"
                type="password"
                placeholder="******************"
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
