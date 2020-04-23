import React from "react";
import Quote from "../../../Quote";

export default class EmptyCart extends React.Component {
  render() {
    return (
      <div>
        <div className="mb-4 text-center">
          <h1 className="text-4xl">Wow such empty.</h1>
          <p className="text-xl">
            Find some nice products{" "}
            <a className="text-gray-700 hover:text-gray-500" href="/dashboard">
              here
            </a>
          </p>
        </div>
        <Quote name="Terminator 2" quote="Hasta la vista, baby." />
      </div>
    );
  }
}
