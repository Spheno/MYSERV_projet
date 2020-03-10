import React from "react";

import "../../styles/alerts.css";

/* 
  When chkAlertDelete is checked, we hide the alert with shouldHide set at true.
  Otherwise, when shoudlHide is false, it's shown.
*/
export default class AlertDeleteArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: null
    };

    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.setState({ showAlert: this.props.showAlert });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("state of showAlert", this.state.showAlert);

    if (prevProps.showAlert !== this.props.showAlert) {
      let shouldShow = this.props.showAlert;
      console.log("props received for showAlert", shouldShow);

      if(shouldShow !== this.state.showAlert) {
        this.setState({ showAlert: shouldShow });
      }
    }
  }

  close() {
    this.props.closeAlert();
  }

  render() {
    if (this.state.showAlert) {
      return (
        <div className="fixed top-0 z-10 w-full alert-banner" onClick={this.close}>
          <input
            type="checkbox"
            className="hidden"
            id="banneralert"
            ref="chkAlertDelete"
          />

          <label
            className="flex items-center justify-between w-full p-2 text-white bg-red-500 shadow cursor-pointer close"
            title="close"
            htmlFor="banneralert"
          >
            Damn dude, you just deleted your article...
            <svg
              className="text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </label>
        </div>
      );
    } else return null;
  }
}
