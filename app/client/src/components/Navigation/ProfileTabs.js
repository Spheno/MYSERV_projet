import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import PaymentInfo from "../Account/Content/Profile/PaymentInfo";
import ProfileCustom from "../Account/Content/Profile/ProfileCustom";
import AccountSettings from "../Account/Content/Profile/AccountSettings";

export default class ProfileTabs extends React.Component {
  render() {
    return (
      <Tabs selectedTabClassName="md:border md:border-gray-700 md:hover:bg-gray-100 md:shadow" className="z-10 mx-auto lg:w-3/6">
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
          <AccountSettings />
        </TabPanel>
        <TabPanel>
          <PaymentInfo />
        </TabPanel>
        <TabPanel>
          <ProfileCustom />
        </TabPanel>
      </Tabs>
    );
  }
}
