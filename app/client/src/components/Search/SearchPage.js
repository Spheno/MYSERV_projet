import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoaderScreen from "../Loader/LoaderScreen";
import searchSVG from "../../images/search.svg";
import Header from "../Header/Header";
import SVGIcon from "../SVG/SVGIcon";
import SearchByTag from "./SearchByTag";
import SearchByProduct from "./SearchByProduct";
import SearchByUser from "./SearchByUser";
import Footer from "../Footer/Footer"

export default function SearchPage(props) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState();
  const [userNumber, setUserNumber] = useState("");

  const { by, search } = useParams();

  useEffect(() => {
    const clientData = JSON.parse(localStorage.getItem("user"));
    setUserNumber(clientData.phoneNumber);

    switch (by) {
      case "user":
        setContent(<SearchByUser userName={search} />);
        break;
      case "tag":
        setContent(<SearchByTag tag={search} userNumber={userNumber} />);
        break;
      default:
        setContent(<SearchByProduct productName={search} userNumber={userNumber} />);
        break;
    }

    setLoading(false);
  }, [by, search, userNumber]);

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
                src={searchSVG}
                cls="absolute right-0 z-auto hidden h-64 max-w-xs mr-32 lg:flex"
              />
              <div className="mt-8 mb-16 sm:mb-0 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
            </main>

            {content}
            
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}
