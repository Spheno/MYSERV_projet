import React from "react";

export default class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  componentDidMount() {
    this.setState({ text: this.props.text });
  }

  render() {
    return (
      <div className="absolute left-0 p-6 ml-4 bg-blue-200 border border-gray-500 rounded shadow-sm">
        {this.state.text}
      </div>
    );
  }
}
