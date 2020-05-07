import React from "react";

export default class ProfileBio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: ""
    };
  }

  componentDidMount() {
    this.setState({ bio: this.props.bio });
  }

  render() {
    let { bio } = this.state;
    if(!bio) bio = "No bio given."

    return (
      <div className="max-w-lg mx-auto">
        <p className="italic leading-relaxed text-center">{bio}</p>
      </div>
    );
  }
}
