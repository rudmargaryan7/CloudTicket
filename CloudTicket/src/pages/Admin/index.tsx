import React, { FC, useState } from "react";
import AdminSideBar from "./Components/AdminSideBar";
import AdminNewTicket from "./Components/AdminNewTicket";
import AdminCurrentTickets from "./Components/AdminCurrentTickets";
import AdminHistoryTickets from "./Components/AdminHistoriTickets";

export type AdminTableTypes = "new" | "current" | "history";

const Pages: { new: FC; current: FC; history: FC } = {
  new: AdminNewTicket,
  current: AdminCurrentTickets,
  history: AdminHistoryTickets,
};

const AdmingPage: FC = () => {
  const [tableItem, setTableItem] = useState<AdminTableTypes>("current");
  const Component: FC = Pages[tableItem];
  return (
    <div className="w-full flex h-full">
      <AdminSideBar selectedItem={tableItem} setSelectedItem={setTableItem} />
      <div className="w-full">
        <Component />
      </div>
    </div>
  );
};

export default AdmingPage;
