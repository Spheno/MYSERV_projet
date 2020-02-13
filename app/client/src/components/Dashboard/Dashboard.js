import React from "react";
import API from "../../utils/API";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  disconnect = () => {
    API.logout();
    window.location = "/";
  };
  render() {
    return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <button onClick={this.disconnect} type="submit">
          Se déconnecter
        </button>
      </div>
    );
  }
}

export default Dashboard;
