import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../../styles/cartArticle.css";
import avatar from "../../../../images/avatar/einstein.jpg";
import article from "../../../../images/articles/playstation5.jpg";

/* TODO: make articles clickable and zoomable (Magnifier.js) */

export default class CartArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nbArticles: 1,
      total: null,
      product: {
        id: 1,
        title: "Playstation 5",
        description:
          "The new gen console that will amaze and entertain all your friends!",
        img: null,
        authorAvatar: null,
        authorName: "Albert",
        date: new Date(
          Date.UTC(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getUTCDate()
          )
        ),
        options: {
          year: "numeric",
          month: "numeric",
          day: "numeric"
        },
        category: "",
        price: 15,
        devise: "€",
        quantity: 2,
        tags: [["gaming"], ["sony"], ["fun"]]
      }
    };
  }

  decrement(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);

    if (value - 1 < 1) return false;

    value--;
    target.value = value;
  }

  increment(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value++;
    target.value = value;
  }

  render() {
    let dateFormated = new Intl.DateTimeFormat(
      "default",
      this.state.product.options
    ).format(this.state.product.date);

    return this.state.nbArticles === 0 ? (
      <p>Wow such empty.</p>
    ) : (
      <div className="block w-full">
        <h1 className="text-3xl font-medium leading-snug tracking-wider text-center text-gray-800">
          Number of articles: {this.state.nbArticles}
        </h1>
        <p className="px-6 mt-2 text-lg text-center text-gray-700">
          Total: {this.state.product.price * this.state.product.quantity}{" "}
          {this.state.product.devise}
        </p>
        <div className="w-24 h-1 mx-auto my-6 bg-indigo-700 rounded opacity-75"></div>
        <div className="w-full lg:flex">
          <div
            className="flex-none h-48 overflow-hidden text-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l"
            style={{
              flex: 1,
              backgroundImage: `url(${article})`
            }}
            title="Article example"
          ></div>

          <div className="flex flex-col justify-between p-4 leading-normal bg-white border-b border-l border-r border-gray-400 rounded-b lg:border-l-0 lg:border-t lg:border-gray-400 lg:rounded-b-none lg:rounded-r">
            <div className="mb-8">
            <div className="w-full px-2 mt-2">
                  <div className="flex flex-row float-right w-4/12 bg-transparent rounded-lg">
                    <button
                      data-action="decrement"
                      onClick={this.decrement}
                      className="w-20 text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-400"
                    >
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>{" "}
                    <input
                      type="number"
                      className="flex items-center w-full font-semibold text-center text-gray-700 bg-gray-300 outline-none w- focus:outline-none text-md hover:text-black focus:text-black md:text-basecursor-default"
                      name="custom-input-number"
                      min="1"
                      defaultValue={this.state.product.quantity}
                    />{" "}
                    <button
                      data-action="increment"
                      onClick={this.increment}
                      className="w-20 h-full text-gray-600 bg-gray-300 rounded-r cursor-pointer hover:text-gray-700 hover:bg-gray-400"
                    >
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              <div className="mb-2 text-xl font-bold text-gray-900">
                {this.state.product.title} -{" "}
                <span className="text-gray-700">
                  {this.state.product.price}
                  {this.state.product.devise}
                </span>
              </div>
              <p className="text-base text-gray-700">
                {this.state.product.description}
              </p>
            </div>
            <div className="block mt-1 mb-4">
              <a
                className="inline px-2 py-1 mx-1 text-xs text-gray-700 lowercase bg-gray-300 rounded-full"
                href="#top"
              >
                #{this.state.product.tags[0]}
              </a>
              <a
                className="inline px-2 py-1 mx-1 text-xs text-gray-700 lowercase bg-gray-300 rounded-full"
                href="#top"
              >
                #{this.state.product.tags[1]}
              </a>
              <a
                className="inline px-2 py-1 mx-1 text-xs text-gray-700 lowercase bg-gray-300 rounded-full"
                href="#top"
              >
                #{this.state.product.tags[2]}
              </a>
            </div>
            <footer className="relative flex items-center">
              <img
                className="w-10 h-10 mr-4 rounded-full"
                src={avatar}
                alt="Avatar"
              />
              <div className="text-sm">
                <p className="leading-none text-gray-900">
                  {this.state.product.authorName}
                </p>
                <p className="text-gray-600">{dateFormated}</p>
              </div>
              <div className="absolute right-0 flex justify-end text-2xl">
                
                <div className="px-2 m-2">
                  <a
                    className="text-gray-700 no-underline hover:text-red-600"
                    href="#top"
                  >
                    <span className="hidden">Like</span>
                    <FontAwesomeIcon icon="heart" />
                  </a>
                </div>
                <div className="px-2 m-2">
                  <a
                    className="text-gray-700 no-underline hover:text-red-600"
                    href="#top"
                  >
                    <span className="hidden">Delete</span>
                    <FontAwesomeIcon icon="trash-alt" />
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
