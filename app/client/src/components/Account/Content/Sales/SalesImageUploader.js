import React, { Component } from "react";

const MAX_NB_PICTURES = 3;
const MAX_PICTURE_SIZE = 4000000; // en octets => 4MB

export default class SalesImageUploader extends Component {
  constructor(props) {
    super(props);

    this.handleFiles = this.handleFiles.bind(this);
  }

  handleFiles(e, selectedFiles) {
    let filesArray = [];
    let filesObj = [];
    let err = null;
    const types = ["image/png", "image/jpeg"];

    if (selectedFiles && selectedFiles !== undefined) {
      Array.from(selectedFiles).forEach(file => {
        if (types.every(type => file.type !== type)) {
          err = "Only jpeg and png images are compatible. Please try again.";
        } else if (file.size > MAX_PICTURE_SIZE) {
          err =
            "Your picture is too large, please pick a smaller one. (max.: 4MB)";
        } else {
          filesArray.push(file);
          filesObj.push(URL.createObjectURL(file));
        }
      });
    } else {
      err = "file upload error";
    }

    if (filesArray.length > MAX_NB_PICTURES) {
      err = "Veuillez sélectionner au maximum 3 images.";
    }

    if (err) {
      alert(err);
      e.target.value = null;
      filesArray = []; // reset des tableaux de files et url
      filesObj = [];
      this.props.handlePictures(filesArray, filesObj);
    } else {
      console.log("filesArray", filesArray);
      console.log("filesObj", filesObj);
      this.props.handlePictures(filesArray, filesObj);
    }
  }

  render() {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <div className="max-w-md text-center text-blue-700">
          <label className="flex flex-col items-center w-64 px-4 py-6 tracking-wide text-blue-500 uppercase bg-white border border-blue-300 rounded-lg shadow-lg cursor-pointer hover:bg-blue-500 hover:text-white">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">
              Select your images
            </span>
            <input
              className="hidden"
              type="file"
              name="pictures"
              multiple
              onChange={e => this.handleFiles(e, e.target.files)}
              accept="image/jpeg, image/png"
            />
          </label>
        </div>
      </div>
    );
  }
}
