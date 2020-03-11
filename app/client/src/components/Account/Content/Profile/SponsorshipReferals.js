import React from "react";

export default class SponsorshipReferals extends React.Component {
  render() {
    return (
      <div className="px-2 pb-4 sm:flex sm:items-center">
        <div className="flex-grow">
          <div className="w-full">
            <div className="flex my-1">
              <div className="w-4/5 h-10 px-1 py-3">
                <a href="#top" className="hover:text-blue-700 hover:underline">
                  Kevin Durant
                </a>
              </div>
              <div className="w-1/5 h-10 p-3 text-right">
                <p className="text-sm text-gray-800">11/02/2020</p>
              </div>
            </div>
            <div className="flex my-1">
              <div className="w-4/5 h-10 px-1 py-3">
                <a href="#top" className="hover:text-blue-700 hover:underline">
                  James Harden
                </a>
              </div>
              <div className="w-1/5 h-10 p-3 text-right">
                <p className="text-sm text-gray-700">09/02/2020</p>
              </div>
            </div>
            <div className="flex my-1">
              <div className="w-4/5 h-10 px-1 py-3">
                <a href="#top" className="hover:text-blue-700 hover:underline">
                  Michael Jordan
                </a>
              </div>
              <div className="w-1/5 h-10 p-3 text-right">
                <p className="text-sm text-gray-700">28/01/2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
