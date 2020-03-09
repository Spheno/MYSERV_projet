import React from "react";
import { RadioGroup, Radio } from "react-radio-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class AddCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: "visa"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ selectedValue: value });
  }

  render() {    
    return (
      <form>
        <div className="flex flex-wrap justify-center mb-8">
          <RadioGroup
            name={"creditCards"}
            selectedValue={this.state.selectedValue}
            onChange={this.handleChange}
          >
            <label>
              <Radio value={"visa"} />
              <FontAwesomeIcon icon={["fab", "cc-visa"]} size="3x" className="ml-2 mr-8" />
            </label>
            <label>
              <Radio value={"mastercard"} />
              <FontAwesomeIcon icon={["fab", "cc-mastercard"]} size="3x" className="ml-2 mr-8" />
            </label>
            <label>
              <Radio value={"ecarte"} />
              <span className="ml-2">e-CARTE</span>
            </label>
          </RadioGroup>
        </div>

        <div>
          <input
            type="text"
            className="flex-1 w-4/6 p-3 text-sm text-gray-900 bg-gray-200 rounded-l focus:outline-none"
            placeholder="Card Number"
          />
          <input
            type="text"
            className="inline-block w-1/6 p-3 text-sm text-gray-900 bg-gray-200 focus:outline-none"
            placeholder="MM / YY"
          />
          <input
            type="text"
            className="inline-block w-1/6 p-3 mt-2 text-sm text-gray-900 bg-gray-200 rounded-r focus:outline-none"
            placeholder="CVC"
          />
          <input
            type="text"
            className="inline-block w-4/6 p-3 mt-2 text-sm text-gray-900 bg-gray-200 rounded-r focus:outline-none"
            placeholder="Full Name"
          />

          <div className="my-6 text-center">
            <button
              type="submit"
              className="w-40 py-3 my-1 text-center text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    );
  }
}
