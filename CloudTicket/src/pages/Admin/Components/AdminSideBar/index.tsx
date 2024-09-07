import React, { FC } from "react";
import { AdminTableTypes } from "../..";
import { Button } from "@mui/material";

type AdinSideBarTypes = {
  selectedItem: AdminTableTypes;
  setSelectedItem: (type: AdminTableTypes) => void;
};

const AdminSideBar: FC<AdinSideBarTypes> = ({
  selectedItem,
  setSelectedItem,
}) => {
  return (
    <div className="flex flex-col h-full gap-2 border-r-2 w-[25%] px-2 py-4 border-slate-400 border-solid	">
      <Button
        variant={selectedItem === "new" ? "contained" : "text"}
        onClick={() => setSelectedItem("new")}
      >
        New
      </Button>
      <Button
        variant={selectedItem === "current" ? "contained" : "text"}
        onClick={() => setSelectedItem("current")}
      >
        Current
      </Button>
      <Button
        variant={selectedItem === "history" ? "contained" : "text"}
        onClick={() => setSelectedItem("history")}
      >
        History
      </Button>
    </div>
  );
};

export default AdminSideBar;
