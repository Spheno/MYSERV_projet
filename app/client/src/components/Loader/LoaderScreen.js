import React from "react";
import Loader from "react-loader-spinner";

export default class LoaderScreen extends React.Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="mb-16 text-3xl font-bold">Please wait a moment...</h1>
        <Loader
          type="Oval"
          color="Purple"
          height={200}
          width={200}
          timeout={20000} //3 secs
        />
      </div>
    );
  }
}
