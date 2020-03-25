import React from "react";

export default class ArticleSVG extends React.Component {
  render() {
    return (
      <>
        <svg
          className="absolute bottom-0 left-0 mb-8"
          viewBox="0 0 375 283"
          fill="none"
          style={{ transform: "scale(1.5)", opacity: "0.1" }}
        >
          <rect
            x="159.52"
            y="175"
            width="152"
            height="152"
            rx="8"
            transform="rotate(-45 159.52 175)"
            fill="white"
          />
          <rect
            y="107.48"
            width="152"
            height="152"
            rx="8"
            transform="rotate(-45 0 107.48)"
            fill="white"
          />
        </svg>
        <div className="relative flex items-stretch justify-center h-64 px-10 pt-10">
          <img
            className="relative w-full bg-contain"
            src={this.props.source}
            alt=""
          />
        </div>
      </>
    );
  }
}
