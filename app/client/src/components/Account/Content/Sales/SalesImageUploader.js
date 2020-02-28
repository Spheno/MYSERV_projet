import React, { Component } from "react";
import Spinner from "./Spinner";
import Images from "./Images";
import Buttons from "./Buttons";
/*import { API_URL } from "../../../../utils/API";*/

export default class SalesImageUploader extends Component {
  state = {
    uploading: false,
    images: []
  };

  onChange = e => {
    let errs = [];
    const files = Array.from(e.target.files);
    this.setState({ uploading: true });
    const formData = new FormData();

    // There are too many files!
    if (files.length > 1) {
      const msg = "Only one image can be uploaded for this product";
      return console.log(msg);
    }

    const types = ["image/png", "image/jpeg"];

    files.forEach((file, i) => {
      // Catching wrong file types on the client
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`);
      }

      // Catching files that are too large on the client
      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`);
      }

      formData.append(i, file);
    });

    if (errs.length) {
      return errs.forEach(err => alert(err));
    }

    /*
    fetch(`${API_URL}/image-upload`, {
      method: "POST",
      body: formData
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(images => {
        this.setState({
          uploading: false,
          images
        });
      })
      .catch(err => {
        err.json().then(e => {
          this.toast(e.message, "custom", 2000, toastColor);
          this.setState({ uploading: false });
        });
      });
      */
  };

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    });
  };

  render() {
    const { uploading, images } = this.state;

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />;
        case images.length > 0:
          return <Images images={images} removeImage={this.removeImage} />;
        default:
          return <Buttons onChange={this.onChange} />;
      }
    };

    return (
      <div>
        <div className="py-10 text-center border buttons">{content()}</div>
      </div>
    );
  }
}
