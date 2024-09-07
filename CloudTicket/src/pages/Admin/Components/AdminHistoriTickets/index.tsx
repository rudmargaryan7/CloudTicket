import { getHistoryTickets } from "@/api";
import useQuery from "@/utils/query";
import React, { FC, useEffect, useState } from "react";
import { InputsTypes } from "../AdminNewTicket";
import Ticket from "@/components/Ticket";
import { v4 as uuidv4 } from "uuid";

const AdminHistoryTickets: FC = () => {
  const [items, setItems] = useState<InputsTypes[]>([]);
  const { onSumbit } = useQuery(
    getHistoryTickets,
    {},
    (data: { payload: InputsTypes[] }) => setItems(data.payload)
  );
  useEffect(() => {
    onSumbit();
  }, []);
  return (
    <div className="flex flex-col h-full py-4 px-5 gap-5 overflow-auto	">
      {items?.map((e: InputsTypes) => {
        return <Ticket isHistory={true} data={e} key={uuidv4()} />;
      })}
    </div>
  );
};

export default AdminHistoryTickets;
