import React from "react";

export default class ArticleComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userAvatar: "https://picsum.photos/id/646/200/200",
      userName: "Mary T.",
      commentTitle: "Super product",
      commentContent:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, se do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      commentStars: 4
    };
  }
  render() {
    return (
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="relative inline-block">
            <div className="relative w-16 h-16 overflow-hidden rounded-full">
              <img
                className="absolute top-0 left-0 object-cover w-full h-full bg-cover object-fit"
                src={this.state.userAvatar}
                alt="Profile avatar"
              />
              <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
            </div>
          </div>
        </div>
        <div className="ml-6">
          <p className="flex items-baseline">
            <span className="font-bold text-gray-600">{this.state.userName}</span>
          </p>
          <div className="flex items-center mt-1">
            {Array.from(Array(this.state.commentStars), (e, i) => {
              return (
                <svg
                  key={"yelloStar" + i}
                  className="w-4 h-4 text-yellow-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              );
            })}
            {Array.from(Array(5 - this.state.commentStars), (e, i) => {
              return (
                <svg
                  key={"greyStar" + i}
                  className="w-4 h-4 text-gray-400 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              );
            })}
          </div>

          <div className="mt-3">
            <span className="font-bold">{this.state.commentTitle}</span>
            <p className="mt-1">{this.state.commentContent}</p>
          </div>
        </div>
      </div>
    );
  }
}
