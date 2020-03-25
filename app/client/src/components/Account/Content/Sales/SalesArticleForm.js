import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API from "../../../../utils/userAPI";

import {
  faEye,
  faStream,
  faTags,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import SalesImageUploader from "./SalesImageUploader";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const NB_TAGS_MAX = 5;

export default function SalesArticleForm(props) {
  const [title, setTitle] = useState("Test");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [category, setCategory] = useState("Other");
  const [tags, setTags] = useState([]);
  const [pictures, setPicture] = useState([]);

  const categories = props.categories; // categories list to display items in select

  const handleSubmit = async e => {
    e.preventDefault();

    if (!title || title.length === 0) {
      alert("Veuillez renseigner un nom pour votre produit.");
      return;
    }
    if (!price || price <= 0) {
      alert("Le prix de votre produit doit être supérieur à 0.");
      return;
    }

    let data = new FormData();
    data.set("title", title.trim());

    pictures.map((picture, index) => {
      return data.append("pictures", picture);
    });

    data.set("description", description.trim());
    data.set("price", price);
    data.set("category", category);
    data.set("tags", tags);
    const authorData = JSON.parse(localStorage.getItem("user"));
    data.set("authorNumber", authorData.phoneNumber);

    for (var pair of data.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    try {
      const response = await API.createProduct(data);
      if(response) {
        e.target.reset();
        toast.success("upload success");
        //formRef.reset()
        console.log("Response", response);
      }
    } catch (error) {
      toast.error("upload fail", error)
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

  // gets array of File and asigns it to pictures
  const handlePicture = pics => {
    setPicture(pics);
  };

  return (
    <div>
      <div className="form-group">
        <ToastContainer />
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
        <div className="flex flex-col px-8 pt-6 pb-8 my-2 mb-4 bg-white border-gray-300 rounded md:shadow-md md:border">
          <div className="px-3 mb-6 -mx-3">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-product-category"
            >
              Title <FontAwesomeIcon icon={faStream} size="1x" />
            </label>
            <input
              className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-6 -mx-3 md:flex">
            <div className="px-3 mb-6 md:w-1/2 md:mb-0">
              <SalesImageUploader
                name="pictures"
                handlePictures={handlePicture}
              />
            </div>
            <div className="px-3 md:w-1/2">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-product-description"
              >
                Description <FontAwesomeIcon icon="edit" size="1x" />
              </label>
              <textarea
                className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border rounded appearance-none border-gray-lighter"
                id="grid-product-description"
                rows="9"
                type="text"
                placeholder="Describe me"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-2 -mx-3 md:flex">
            <div className="px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-product-price"
              >
                Price <FontAwesomeIcon icon="money-bill-wave-alt" size="1x" />
              </label>
              <div className="relative flex flex-wrap items-stretch w-full py-1">
                <div className="flex">
                  <span className="flex items-center px-3 text-sm leading-normal text-gray-700 whitespace-no-wrap bg-gray-200 border border-gray-500">
                    €
                  </span>
                </div>
                <input
                  type="number"
                  id="grid-product-price"
                  min="0"
                  className="relative flex-1 flex-auto flex-grow flex-shrink w-px h-10 px-3 px-4 py-3 leading-normal bg-gray-200 border border-gray-200 rounded appearance-none"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-product-category"
              >
                Category <FontAwesomeIcon icon={faStream} size="1x" />
              </label>
              <div className="relative">
                <select
                  className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-product-category"
                  onChange={e => setCategory(e.target.value)}
                >
                  <option defaultValue={category}>Other</option>
                  {categories.map((cat, index) => {
                    return (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    );
                  })}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-product-tags"
            >
              Tags <FontAwesomeIcon icon={faTags} size="1x" />
            </label>
            <ReactTagInput
              id="grid-product-tags"
              tags={tags}
              placeholder={"Type and press enter (" + NB_TAGS_MAX + " max.)"}
              maxTags={NB_TAGS_MAX}
              editable={true}
              readOnly={false}
              removeOnBackspace={true}
              onChange={newTags => setTags(newTags)}
            />
          </div>

          <div className="flex content-center my-8 text-center">
            <div className="w-1/2">
              <a
                className="hidden px-4 py-3 my-1 text-white bg-teal-500 border border-blue-500 rounded md:inline hover:bg-teal-700 focus:outline-none"
                href="#top"
              >
                Watch your offer before sending
              </a>
              <a
                className="inline px-16 py-3 text-white bg-teal-500 border border-blue-500 rounded md:hidden hover:bg-teal-700 focus:outline-none"
                href="#top"
              >
                <FontAwesomeIcon icon={faEye} size="1x" />
              </a>
            </div>
            <div className="w-1/2">
              <button
                type="submit"
                className="hidden w-40 py-3 -mt-4 text-white bg-green-500 rounded hover:bg-green-700 md:inline focus:outline-none"
              >
                Send
              </button>
              <button
                type="submit"
                className="inline px-16 py-3 -mt-4 text-white bg-green-500 border border-green-500 rounded md:hidden hover:bg-green-700 focus:outline-none"
              >
                <FontAwesomeIcon icon={faPaperPlane} size="1x" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
