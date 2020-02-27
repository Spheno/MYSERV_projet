import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default class NavTabs extends React.Component {
  render() {
    return (
      <Tabs
        selectedTabClassName="md:border md:border-gray-700 md:hover:bg-gray-100 md:shadow"
        className="z-10 mx-auto lg:w-3/6"
      >
        <TabList className="flex justify-around mb-8 text-center">
          {this.props.tabtitles.map((title, index) => (
            <Tab
              key={index}
              className="inline-block px-4 py-2 font-semibold text-blue-500 bg-white cursor-pointer hover:text-blue-800"
            >
              {title}
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
