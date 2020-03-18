import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

const MAX_NB_PICTURES = 3;
const MAX_PICTURE_SIZE = 4000000; // en octets => 4MB

export default class SalesImageUploader extends Component {
  constructor(props) {
    super(props);

    this.handleFiles = this.handleFiles.bind(this);
  }

  handleFiles(e, selectedFiles) {
    let newFiles = [];
    let err = null;
    const types = ['image/png', 'image/jpeg']

    if (selectedFiles && selectedFiles !== undefined) {
      Array.from(selectedFiles).forEach(file => {
        if (types.every(type => file.type !== type)) {
          err = "Only jpeg and png images are compatible. Please try again.";
        } else if (file.size > MAX_PICTURE_SIZE) {
          err = "Your picture is too large, please pick a smaller one. (max.: 4MB)"
        } else {
          newFiles.push(file);
        }
      });
    } else {
      err = "file upload error";
    }

    if(newFiles.length > MAX_NB_PICTURES) {
      err = "Veuillez sélectionner au maximum 3 images."
    }

    if(err) {
      alert(err);
      e.target.value = null;
    } else {
      this.props.handlePictures(newFiles);
    }
  }

  render() {
    return (
      <div className="flex h-full p-4 border">
        <div className="text-center text-blue-700">
          <label>
            <FontAwesomeIcon icon={faImages} size="8x" />
            <input
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
