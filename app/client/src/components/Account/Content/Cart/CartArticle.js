import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../../styles/cartArticle.css";
import avatar from "../../../../images/avatar/einstein.jpg";
import article from "../../../../images/articles/playstation5.jpg";
import { confirmAlert } from "react-confirm-alert"; /* custom confirm pop up */
import AlertDeleteArticle from "../../../Alerts/AlertDeleteArticle";

/* TODO: make articles clickable and zoomable (Magnifier.js) */

export default class CartArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false,
      nbArticles: 1,
      total: null,
      devise: "€",
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
        quantity: 2,
        tags: [["gaming"], ["sony"], ["fun"]]
      }
    };
  }

  deleteArticle = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.setState({ showAlert: true })
        },
        {
          label: "No",
          onClick: () => null
        }
      ]
    });
  };

  closeAlert() {
    this.setState({ showAlert: false });
  }

  render() {
    let dateFormated = new Intl.DateTimeFormat(
      "default",
      this.state.product.options
    ).format(this.state.product.date);

    return (
      <article className="overflow-hidden rounded-lg shadow-lg">
        <AlertDeleteArticle
          showAlert={this.state.showAlert}
          closeAlert={this.closeAlert.bind(this)}
        />

        <a href="#top">
          <img
            alt="Article example"
            className="block w-full h-auto"
            src={article}
          />
        </a>

        <header className="flex items-center justify-between p-2 leading-tight md:p-4">
          <h1 className="text-lg">
            <a
              className="font-bold text-gray-900 no-underline hover:underline"
              href="#top"
            >
              {this.state.product.title} -{" "}
              <span className="text-gray-700">
                {this.state.product.price}{""}{this.state.devise}
              </span>
            </a>
          </h1>
          <p className="text-sm text-grey-darker">{dateFormated}</p>
        </header>

        <div className="flex flex-col justify-between px-4 py-2 leading-normal">
          <p className="mb-4 text-base text-gray-700">
            {this.state.product.description}
          </p>

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
        </div>

        <footer className="relative flex items-center p-2 leading-none md:p-4">
          <a
            className="flex items-center text-black no-underline hover:underline"
            href="#top"
          >
            <img
              alt="Placeholder"
              className="w-10 h-10 mr-4 rounded-full"
              src={avatar}
            />
            <p className="ml-2 text-sm">{this.state.product.authorName}</p>
          </a>
          <div className="absolute right-0 flex justify-end text-2xl">
            <a
              className="px-2 m-2 text-gray-700 no-underline hover:text-red-600"
              href="#top"
            >
              <span className="hidden">Like</span>
              <FontAwesomeIcon icon="heart" />
            </a>
            <button
              className="px-2 m-2 text-gray-700 no-underline hover:text-red-600"
              href="#top"
              onClick={this.deleteArticle}
            >
              <span className="hidden">Delete</span>
              <FontAwesomeIcon icon="trash-alt" />
            </button>
          </div>
        </footer>
      </article>
    );
  }
}
