import React, { FC } from "react";
import "./index.scss";
import FlightCard from "./FlightCard";
import { useAppSelector } from "@/app/hooks";
import { v4 as uuid } from "uuid";
const HomeFlightDetails: FC = () => {
  const tickets = useAppSelector((state) => state.tickets.homeTickets);
  return (
    <div className="flex flex-col gap-7 container pt-[40px] mx-auto">
      <div className="flex flex-col gap-2">
        <div className="details__list text-2xl font-bold">
          {!tickets?.length
            ? "Select country to see result"
            : `Flight deals from ${tickets[0].from.country}`}
        </div>
        <div className="subtitle text-md">
          Here are the flight deals with the lowest prices. Act fast – they all
          depart within the next three months.
        </div>
      </div>
      {tickets?.length === 0 ? (
        <div className="text-center">Not result</div>
      ) : (
        <div className="grid gap-4  grid-cols-3">
          {tickets?.map((e) => {
            return <FlightCard key={uuid()} data={e} />;
          })}
        </div>
      )}
    </div>
  );
};

export default HomeFlightDetails;
