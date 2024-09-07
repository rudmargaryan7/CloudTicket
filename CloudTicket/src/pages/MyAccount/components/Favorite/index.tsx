import React, { useEffect, useState } from "react";
import useQuery from "@/utils/query";
import { getFavorits } from "@/api";
import { InputsTypes } from "@/pages/Admin/Components/AdminNewTicket";
import Ticket from "@/components/Ticket";
import { v4 as uuid } from "uuid";

const MyAccountFavorite: React.FC = () => {
  const [tickets, setTickets] = useState<InputsTypes[]>([]);
  const { onSumbit } = useQuery(getFavorits, {}, ({ tickets }) =>
    setTickets(tickets.map((e: InputsTypes) => ({ ...e, liked: true })))
  );
  useEffect(() => {
    onSumbit();
  }, []);
  return (
    <div className="flex flex-col w-full items-center py-5 -x-4">
      {tickets.map((e) => {
        return <Ticket data={e} key={uuid()} />;
      })}
    </div>
  );
};

export default MyAccountFavorite;
