import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default class NavTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icons: []
    };
  }
  componentDidMount() {
    var iconsTab = [];
    if (this.props.icons !== undefined) {
      this.props.icons.map((icon, index) => {
        iconsTab[index] = icon;
        return iconsTab;
      });

      this.setState({ icons: iconsTab });
    }
  }

  render() {
    return (
      <Tabs
        selectedTabClassName="md:border md:border-gray-700 md:hover:bg-gray-100 md:shadow"
        className="relative mx-auto bg-transparent"
      >
        <TabList className="flex justify-around mb-8 text-center">
          {this.props.tabtitles.map((title, index) => (
            <Tab
              key={index}
              className="inline-block px-4 py-2 font-semibold text-blue-500 bg-white cursor-pointer hover:text-blue-800"
            >
              {this.state.icons[index]} {title}
            </Tab>
          ))}
        </TabList>

        {this.props.contents.map((Component, index) => (
          <TabPanel key={index}>{Component}</TabPanel>
        ))}
      </Tabs>
    );
  }
}
