import React from "react";
import Avatar from "react-avatar-edit";

const MAX_IMG_SIZE = 5000000; // 5Mo = 5 000 000 octets

export default class AvatarProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: null
    };

    this.checkFileBeforeLoad = this.checkFileBeforeLoad.bind(this);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  checkFileBeforeLoad(event, preview) {
    let errorDetected = null;
    let file_size = event.target.files[0].size;
    let file_type = event.target.files[0].type;
    
    if(file_size > MAX_IMG_SIZE) {
      errorDetected = "Le fichier est trop volumineux. Limité à 5Mo";
    }

    if(file_type !== "image/jpeg" && file_type !== "image/png") {
      errorDetected = "Fichiers .jpeg et .png acceptés seulement !";
    }

    alert("error: " + errorDetected);
    if(errorDetected !== null) {
      this.onCrop(preview);
    }

    return false;
  }

  // Invoked when user drag&drop event stop and return croped image in base64 sting in preview variable
  onCrop(preview) {
    this.setState({ preview });
  }
  // Invoked when user clock on close editor button
  onClose() {
    this.setState({ preview: null });
  }

  render() {
    return (
      <>
        <Avatar
          width={250}
          height={250}
          cropRadius={50}
          onBeforeFileLoad={this.checkFileBeforeLoad}
          onClose={this.onClose}
          src={this.props.img}
        />
      </>
    );
  }
}
