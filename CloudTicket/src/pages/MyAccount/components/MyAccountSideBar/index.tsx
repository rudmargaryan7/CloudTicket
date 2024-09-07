import React from "react";
import { TabsType } from "../..";
import { Button } from "@mui/material";

type MyAccountSideBarType = {
  tab: TabsType;
  setTab: (tab: TabsType) => void;
};

const MyAccountSideBar: React.FC<MyAccountSideBarType> = ({ tab, setTab }) => {
  return (
    <div className="flex flex-col w-[40%] border-2 border-r-tertiary-color max-w-[350px] py-4 px-3 gap-2">
      <Button
        variant={tab === "info" ? "contained" : "outlined"}
        onClick={() => setTab("info")}
      >
        Info
      </Button>
      <Button
        variant={tab === "favorite" ? "contained" : "outlined"}
        onClick={() => setTab("favorite")}
      >
        Favorite
      </Button>
    </div>
  );
};

export default MyAccountSideBar;
