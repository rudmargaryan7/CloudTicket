import React, { useState } from "react";
import MyAccountSideBar from "./components/MyAccountSideBar";
import MyAccountInfo from "./components/Info";
import "./index.scss";
import MyAccountFavorite from "./components/Favorite";

export type TabsType = "info" | "favorite";

const tabs: { [key: string]: React.FC } = {
  info: MyAccountInfo,
  favorite: MyAccountFavorite,
};

const MyAccount: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabsType>("info");

  const Component = tabs[selectedTab];
  return (
    <div className="flex w-full flex-1">
      <MyAccountSideBar
        tab={selectedTab}
        setTab={(tab: TabsType) => {
          setSelectedTab(tab);
        }}
      />
      <Component />
    </div>
  );
};

export default MyAccount;
