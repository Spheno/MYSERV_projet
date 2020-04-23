import React, { useState, useEffect } from "react";
import FavArticle from "./FavArticle";
import LoaderScreen from "../../../Loader/LoaderScreen";
import API from "../../../../utils/userAPI";
import EmptyFavs from "./EmptyFavs";

export default function FavList() {
  const phoneNumber = JSON.parse(localStorage.getItem("user")).phoneNumber;

  const [loading, setLoading] = useState(true);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    async function getFavs() {
      try {
        const myFavs = await API.getMyFavs(phoneNumber);
        setLoading(false);
        setFavs(myFavs);
      } catch (error) {
        console.log(error);
      }
    }
    getFavs();
  }, [phoneNumber]);

  if (loading) {
    return <LoaderScreen />;
  }

  if (favs.length) {
    return (
      <div className="z-10">
        <div className="block w-full">
          <h1 className="text-3xl font-medium leading-snug tracking-wider text-center text-gray-800">
            Number of articles: {favs.length}
          </h1>

          <div className="w-24 h-1 mx-auto my-6 bg-indigo-700 rounded opacity-75"></div>

          <div className="container px-4 mx-auto my-12 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              {favs.map((article, index) => {
                return (
                  <div
                    key={index}
                    className="w-full px-1 my-4 sm:w-1/2 md:w-1/3 md:my-4 md:mx-6 lg:w-1/4"
                  >
                    <FavArticle article={article} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else return <EmptyFavs />;
}
