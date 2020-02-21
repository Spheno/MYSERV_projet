import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default class ProfileTabs extends React.Component {
  render() {
    return (
      <Tabs selectedTabClassName="border border-gray-700 hover:bg-gray-100 shadow" className="mx-auto lg:w-3/6">
        <TabList className="flex justify-between mb-8 text-center">
          <Tab className="inline-block px-4 py-2 font-semibold text-blue-500 bg-white cursor-pointer hover:text-blue-800">
            Account settings
          </Tab>
          <Tab className="inline-block px-4 py-2 font-semibold text-blue-500 bg-white cursor-pointer hover:text-blue-800">
            Payment options
          </Tab>
          <Tab className="inline-block px-4 py-2 font-semibold text-blue-500 bg-white cursor-pointer hover:text-blue-800">
            Profile customization
          </Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <p>Test</p>
        </TabPanel>
      </Tabs>
    );
  }
}
