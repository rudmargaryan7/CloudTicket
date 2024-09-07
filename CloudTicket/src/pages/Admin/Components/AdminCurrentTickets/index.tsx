import { getAllTickets } from "@/api";
import useQuery from "@/utils/query";
import React, { FC, useEffect, useState } from "react";
import { InputsTypes } from "../AdminNewTicket";
import Ticket from "@/components/Ticket";
import { v4 as uuidv4 } from "uuid";

const AdminCurrentTickets: FC = () => {
  const [items, setItems] = useState<InputsTypes[]>([]);
  const { onSumbit } = useQuery(
    getAllTickets,
    {},
    (data: { payload: InputsTypes[] }) => setItems(data.payload)
  );
  useEffect(() => {
    onSumbit();
  }, []);
  return (
    <div className="flex flex-col h-full py-4 px-5 gap-5 overflow-auto	">
      {items?.map((e: InputsTypes) => {
        return <Ticket data={e} key={uuidv4()} />;
      })}
    </div>
  );
};

export default AdminCurrentTickets;
