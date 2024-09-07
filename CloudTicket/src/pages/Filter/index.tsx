import { FC } from "react";
import FilterPageSideBar from "./FilterPageComponents/FilterSidebar";
import { useAppSelector } from "@/app/hooks";
import { InputsTypes } from "../Admin/Components/AdminNewTicket";
import Ticket from "@/components/Ticket";
import { v4 as uuid } from "uuid";

const FilterPage: FC = () => {
  const tickets = useAppSelector((state) => state.tickets.filterTickets);
  console.log(tickets);
  return (
    <div className="w-full flex flex-1">
      <FilterPageSideBar />
      <div className="flex flex-col gap-4 items-center w-full pt-10 px-20">
        {tickets.map((e: InputsTypes) => {
          return <Ticket data={e} key={uuid()} />;
        })}
      </div>
    </div>
  );
};

export default FilterPage;
