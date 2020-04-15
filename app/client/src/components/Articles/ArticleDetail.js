import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import LoaderScreen from "../Loader/LoaderScreen";
import Header from "../Header/Header";
import SVGIcon from "../SVG/SVGIcon";
import shoppingApp from "../../images/shopping_app.svg";
import Footer from "../Footer/Footer";
import NavTabs from "../Navigation/NavTabs";
import notFoundPNG from "../../images/articles/not_found.png";
import ArticleCommentList from "./ArticleCommentList";

export default function ArticleDetail(props) {
  let location = useLocation();
  const { product } = location.state;
  const { id } = useParams();

  console.log(product);
  console.log(id);

  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [firstPic, setFirstPic] = useState();

  useEffect(() => {
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setTags(product.tags);
    setPictures(product.pictures);

    if (product.pictures.length > 0) {
      setFirstPic("/" + product.pictures[0].path);
    } else {
      setFirstPic(notFoundPNG);
    }

    const authorData = JSON.parse(localStorage.getItem("user"));
    const phoneNumber = authorData.phoneNumber.slice(1);
    console.log("phone nb", phoneNumber);
    // if the user is the author of this product
    if (phoneNumber === product.authorNumber) {
      setIsAuthor(true);
    }

    setLoading(false);
  }, [product]);

  if (loading) {
    return <LoaderScreen />;
  } else {
    if (isAuthor === true) console.log("You are the author");
    else console.log("You are not the author", isAuthor);

    return (
      <div className="z-50 p-6 bg-purple-700">
        <div className="flex flex-col font-sans bg-white">
          <div className="container px-8 mx-auto">
            <Header />

            <main className="flex flex-col-reverse items-center py-8 mb-4 sm:flex-row jusitfy-between">
              <div className="flex flex-col items-center w-full text-center sm:items-start sm:text-left">
                <h1 className="mb-2 text-6xl font-bold leading-none tracking-wide text-blue-900">
                  Do you like this product?
                </h1>
                <h2 className="mb-6 text-4xl tracking-widest text-orange-500 text-secondary">
                  The information you need.
                </h2>
              </div>
              <SVGIcon
                src={shoppingApp}
                cls="z-0 absolute right-0 hidden h-64 max-w-xs mr-32 lg:flex"
              />
              <div className="mt-8 mb-16 sm:mb-0 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
            </main>

            <section className="px-4 py-12">
              <div className="flex flex-wrap -mx-8">
                <div className="order-2 px-8 mt-6 lg:w-1/2 lg:mt-0 lg:order-none">
                  <h2 className="mb-2 text-4xl font-heading">{title}</h2>
                  <p className="mb-6">{price}€</p>

                  <div className="flex mb-6">
                    <ul className="flex p-0 list-none">
                      <NavTabs
                        tabtitles={["Description", "Reviews"]}
                        contents={[
                          <p className="mb-8 leading-relaxed text-gray-500">
                            {description || "None"}
                          </p>,
                          <ArticleCommentList />
                        ]}
                      />
                    </ul>
                  </div>

                  <table className="w-full mb-6">
                    <tbody>
                      <tr className="border-t">
                        <td className="py-3">Category</td>
                        <td className="text-right">{category}</td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-3">Tags</td>
                        <td className="text-right">
                          {tags.map((tag, index) => {
                            return (
                              <span
                                key={index}
                                className="p-2 mr-2 bg-gray-300 rounded-full"
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {!isAuthor && (
                    <>
                      <a
                        className="inline-block px-8 py-4 leading-none text-white bg-indigo-500 rounded hover:bg-indigo-600"
                        href="#top"
                      >
                        Add to cart
                      </a>
                      <a
                        className="ml-3 leading-tight text-gray-700 hover:text-gray-500"
                        href="#top"
                      >
                        Add to favorites
                      </a>
                    </>
                  )}
                  {isAuthor && (
                    <>
                      <a
                        href="/sales/"
                        className="inline-block px-8 py-4 leading-none text-white bg-indigo-500 rounded hover:bg-indigo-600"
                      >
                        Edit product
                      </a>
                    </>
                  )}
                </div>

                {console.log("pics", pictures)}
            
                <div className="px-8 lg:w-1/2">
                  <img
                    className="max-w-sm mb-4 rounded shadow-md md:max-w-md"
                    src={firstPic}
                    alt="Zoomed product"
                  />
                  {pictures.length > 1 && (
                    <div className="flex flex-wrap -mx-2">
                      {pictures.map((picture, index) => {
                        return (
                          <div className="w-1/3 px-2" key={index}>
                            <img
                              className="h-24 rounded shadow-md "
                              src={"/" + picture.path}
                              alt=""
                              onClick={() => setFirstPic("/" + picture.path)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
