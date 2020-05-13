import React from "react";
import StarRatingComponent from "react-star-rating-controlled-component";
import { ToastContainer, toast } from "react-toastify";

import API from "../../utils/userAPI";

const TOTAL_STARS = 5;

export default class InputComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: "",
      to: "",
      content: "",
      ratings: 0
    };

    this.handleContentChange = this.handleContentChange.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ author: this.props.clientID, to: this.props.userID });
  }

  handleContentChange = e => {
    this.setState({ content: e.target.value });
  };
  onStarClick = (nextValue, prevValue, name) => {
    console.log("rating chosen", nextValue);
    this.setState({ ratings: nextValue });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { author, to, ratings, content } = this.state;

    console.log("author", author);
    console.log("to", to);
    console.log("ratings", ratings);
    console.log("content", content);

    const data = {
      author,
      to,
      ratings,
      content
    };

    try {
      const response = await API.addProfileComment(data);
      if (response.data) {
        toast.success("Your review has been sent!");
        console.log("data comment", response.data);
      }
    } catch (error) {
      toast.error("Oups an error has occured...");
      console.log("Error addProfileComment", error);
    }
  };

  render() {
    let { content, ratings } = this.state;

    return (
      <form className="w-1/2 px-8 mx-auto">
        <div className="form-group">
          <ToastContainer />
        </div>

        <div className="flex flex-wrap justify-start px-3 mb-5 -mx-3">
          <div className="w-full">
            <h1 className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
              Ratings
            </h1>

            <StarRatingComponent
              name="ratingStars"
              starCount={TOTAL_STARS}
              value={ratings}
              onStarClick={this.onStarClick}
            />

            <p className="text-xs italic text-gray-600">
              Rate this profile on 5 for other users
            </p>
          </div>
        </div>
        <div className="flex flex-wrap mb-4 -mx-3">
          <div className="w-full px-3">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="content"
            >
              Comment
            </label>
            <textarea
              className="block w-full h-48 px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none resize-none no-resize focus:outline-none focus:bg-white focus:border-gray-500"
              id="content"
              value={content}
              onChange={this.handleContentChange}
              required
            ></textarea>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="mx-auto">
            <button
              className="px-4 py-2 font-bold text-white bg-teal-400 rounded shadow hover:bg-teal-600 focus:shadow-outline focus:outline-none"
              type="button"
              onClick={this.handleSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    );
  }
}
