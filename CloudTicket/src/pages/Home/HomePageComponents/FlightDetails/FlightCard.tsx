import { InputsTypes } from "@/pages/Admin/Components/AdminNewTicket";
import React, { FC } from "react";
import moment from "moment";
import { useAppSelector } from "@/app/hooks";

const FlightCard: FC<{ data: InputsTypes }> = ({ data }) => {
  const { from, image, date, price } = data;
  const { rate, exchange } = useAppSelector((state) => state.auth);
  const formatedDate = moment(date).format("LL");
  const currentPrice = Math.floor(rate * price);
  return (
    <div className="flight__card flex flex-col ">
      <div className="flight__card__image">
        <img src={image} alt="" width="100%" />
      </div>
      <div className="flight__card__bottom flex px-3 flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="text-xl font-bold">{from.country}</div>
          <div className="text-md">{from.city}</div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="text-sm font-bold">{formatedDate}</div>
              <div className="text-sm text-slate-500">
                {from.Airport.split(".")[0]}
              </div>
            </div>
            <div className="text-md">Direct</div>
          </div>
        </div>
        <div className="flex justify-end text-cyan-600 cursor-pointer">
          from {currentPrice} {exchange} {">"}
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
