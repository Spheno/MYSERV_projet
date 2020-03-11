import React from "react";
import SponsorshipReferals from "./SponsorshipReferals";

export default class SponsorshipContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "ECT56SW",
      referals: 1
    };
  }
  render() {
    let { code, referals } = this.state;

    return (
      <div className="w-full">
        <div className="flex-grow mb-12 text-2xl text-center text-gray-800">
          <p>
            Share this one{" "}
            <span className="p-2 font-bold text-teal-500 uppercase bg-gray-100 border shadow">
              {code}
            </span>
          </p>
        </div>

        <div className="w-full">
        <div className="max-w-md mx-auto">
            <h3 className="px-2 text-3xl font-normal leading-tight md:-ml-16">
              Your referals
            </h3>
            <div>
              {referals ? (
                <SponsorshipReferals />
              ) : (
                <p>I feel alone... Spread that code soldier!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
