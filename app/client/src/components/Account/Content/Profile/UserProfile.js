import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../../Header/Header";
import SVGIcon from "../../../SVG/SVGIcon";

import shoppingApp from "../../../../images/shopping_app.svg";
import ProfileDisplay from "./ProfileDisplay";

export default function UserProfile(props) {
  let location = useLocation();
  const { user } = location.state;
  const { id } = useParams();

  console.log("user", user);

  return (
    <div className="z-50 p-6 bg-purple-700">
      <div className="flex flex-col font-sans bg-white">
        <div className="container px-8 mx-auto">
          <Header />

          <main className="flex flex-col-reverse items-center py-8 mb-4 sm:flex-row jusitfy-between">
            <div className="flex flex-col items-center w-full text-center sm:items-start sm:text-left">
              <h1 className="mb-2 text-6xl font-bold leading-none tracking-wide text-blue-900">
                {user.firstname}'s profile
              </h1>
              <h2 className="mb-6 text-4xl tracking-widest text-orange-500 text-secondary">
                Check this out!
              </h2>
            </div>
            <SVGIcon
              src={shoppingApp}
              cls="z-0 absolute right-0 hidden h-64 max-w-xs mr-32 lg:flex"
            />
            <div className="mt-8 mb-16 sm:mb-0 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
          </main>

          <ProfileDisplay profileUserID={id} />
          
        </div>
      </div>
    </div>
  );
}
