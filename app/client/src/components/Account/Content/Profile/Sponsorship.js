import React from "react";
import SponsorshipContent from "./SponsorshipContent";

export default class Sponsorship extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canReceiveCode: true
    };
  }

  render() {
    var { canReceiveCode } = this.state;

    return (
      <div className="flex flex-col px-8 pt-6 pb-8 my-2 mb-4 bg-white border-gray-300 rounded md:shadow-md md:border">
        <div className="mt-3 mb-12 leading-relaxed text-center">
          <h2 className="text-xl text-gray-800">
            Become a <span className="text-teal-600 uppercase">sponsor</span> by
            sharing your code with your friends, and consult all your{" "}
            <span className="text-teal-600 uppercase">referals</span>
          </h2>
          <p className="text-gray-700">
            When they sign up, make sure they use your code so you both win
          </p>
        </div>
        <div className="flex items-center">
          {!canReceiveCode ? (
            <p className="text-base text-gray-800">
              Unlock your code after your first purchase
            </p>
          ) : (
            <SponsorshipContent />
          )}
        </div>
      </div>
    );
  }
}
