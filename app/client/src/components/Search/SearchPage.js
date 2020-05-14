import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoaderScreen from "../Loader/LoaderScreen";
import dashboardSVG from "../../images/dashboard.svg";
import Header from "../Header/Header";
import SVGIcon from "../SVG/SVGIcon";
import SearchByTag from "./SearchByTag";
import SearchByProduct from "./SearchByProduct";
import SearchByUser from "./SearchByUser";

export default function SearchPage(props) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState();

  const { by, search } = useParams();

  useEffect(() => {
    switch (by) {
      case "user":
        setContent(<SearchByUser search={search} />);
        break;
      case "tag":
        setContent(<SearchByTag search={search} />);
        break;
      default:
        setContent(<SearchByProduct search={search} />);
        break;
    }

    setLoading(false);
  }, [by, search]);

  if (loading) {
    return <LoaderScreen />;
  } else {
    return (
      <div className="p-6 bg-purple-700">
        <div className="flex flex-col w-full font-sans bg-white">
          <div className="container px-8 mx-auto">
            <Header />

            <main className="flex flex-col-reverse items-center py-8 sm:flex-row jusitfy-between">
              <div className="flex flex-col items-center w-full text-center sm:items-start sm:text-left">
                <h1 className="mb-6 text-5xl tracking-widest text-orange-500">
                  Results for: "{search}"{" "}
                </h1>
              </div>
              <SVGIcon
                src={dashboardSVG}
                cls="absolute right-0 z-auto hidden h-64 max-w-xs mr-32 lg:flex"
              />
              <div className="mt-8 mb-16 sm:mb-0 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
            </main>

            {content}
            
          </div>
        </div>
      </div>
    );
  }
}
