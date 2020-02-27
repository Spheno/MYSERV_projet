import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default class NavTabs extends React.Component {
  render() {
    return (
      <Tabs selectedTabClassName="md:border md:border-gray-700 md:hover:bg-gray-100 md:shadow" className="z-10 mx-auto lg:w-3/6">
        <TabList className="flex justify-between mb-8 text-center">
          <Tab className="inline-block px-4 py-2 font-semibold text-blue-500 bg-white cursor-pointer hover:text-blue-800">
            {this.props.tabTitle1}
          </Tab>
          <Tab className="inline-block px-4 py-2 font-semibold text-blue-500 bg-white cursor-pointer hover:text-blue-800">
            {this.props.tabTitle2}
          </Tab>
          <Tab className="inline-block px-4 py-2 font-semibold text-blue-500 bg-white cursor-pointer hover:text-blue-800">
            {this.props.tabTitle3}
          </Tab>
        </TabList>

        <TabPanel>
          {this.props.content1}
        </TabPanel>
        <TabPanel>
          {this.props.content2}
        </TabPanel>
        <TabPanel>
          {this.props.content3}
        </TabPanel>
      </Tabs>
    );
  }
}
