import React from "react";
import Avatar from "react-avatar-edit";

const MAX_IMG_SIZE = 5000000; // 5Mo = 5 000 000 octets

export default class AvatarProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: ""
    };

    this.checkFileBeforeLoad = this.checkFileBeforeLoad.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  checkFileBeforeLoad(event, preview) {
    let errorDetected = null;
    let file_size = event.target.files[0].size;
    let file_type = event.target.files[0].type;

    if (file_size > MAX_IMG_SIZE) {
      errorDetected = "Le fichier est trop volumineux. Limité à 5Mo";
      event.target.value = "";
    }

    if (file_type !== "image/jpeg" && file_type !== "image/png") {
      errorDetected = "Fichiers .jpeg et .png acceptés seulement !";
      event.target.value = "";
    }

    if (errorDetected !== null) {
      this.onCrop(preview);
    }

    return false;
  }

  loadImage(preview) {
    this.props.handlePicture(preview);
  }

  // Invoked when user drag&drop event stop and return croped image in base64 sting in preview variable
  onCrop(preview) {
    this.setState({ preview });
  }
  // Invoked when user click on close editor button
  onClose() {
    this.setState({ preview: null });
  }

  render() {
    return (
      <div className="flex justify-start">
        <div className="w-1/2">
          <Avatar
            width={250}
            height={250}
            imageWidth={250}
            cropRadius={30}
            onBeforeFileLoad={this.checkFileBeforeLoad}
            onFileLoad={this.loadImage}
            onClose={this.onClose}
            onCrop={this.onCrop}
            src={this.props.img}
          />
        </div>
        <div className="hidden w-1/2 lg:block">
          <img className="border" src={this.state.preview} alt="Preview" />
        </div>
      </div>
    );
  }
}
