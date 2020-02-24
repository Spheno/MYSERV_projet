import React from "react";
import Avatar from "react-avatar-edit";

export default class AvatarProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: null // ret
    };

    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
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
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={this.props.img}
        />
      </>
    );
  }
}
