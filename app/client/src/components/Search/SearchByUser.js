import React from "react";

import API from "../../utils/searchAPI";

export default class SearchByUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      search: "",
      results: []
    };
  }

  componentDidMount() {
    try {
      this.setState({ loading: false, search: this.props.search })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="flex flex-wrap items-center justify-between w-full px-2 py-3 mx-auto mt-0">
        <h2 className="text-2xl font-bold tracking-wide text-gray-800 uppercase">
          Users
        </h2>
      </div>
    );
  }
}
