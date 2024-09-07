import React, { FC, useState } from "react";
import bg from "@/assets/images/shapka.png";
import "./filter.scss";
import HomeFilterSelector from "./FilterSelector";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeInput, setFilteredTickest } from "@/features/tickets";
import useQuery from "@/utils/query";
import { filterTickets } from "@/api";
import { useNavigate } from "react-router-dom";

const selectOptions = [
  { value: "economy", label: "Economy" },
  { value: "premium-economy", label: "Premium Economy" },
  { value: "business", label: "Business Class" },
  { value: "first", label: "First Class" },
];

const HomePageFilter: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputs = useAppSelector((state) => state.tickets.filter);
  const { onSumbit } = useQuery(filterTickets, inputs, (data) => {
    dispatch(setFilteredTickest(data?.tickets));
    navigate("/filter");
  });
  const handleInputChange = (name: string, value: string | Date | null) => {
    dispatch(
      changeInput({
        name,
        value,
      })
    );
  };
  return (
    <div
      className="flex justify-center items-center w-full home__filter__block"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* <img src={bg} alt="" /> */}
      <div className="bg-tertiary-color flex gap-2 rounded-2xl py-6 px-2 w-[90%]">
        <HomeFilterSelector
          onChange={(e: string | null | Date) => handleInputChange("from", e)}
          label="From"
          rounded="rounded-l-xl"
          value={inputs.from}
        />
        <HomeFilterSelector
          onChange={(e: string | null | Date) => handleInputChange("to", e)}
          label="To"
          rounded=""
          value={inputs.to}
        />
        <HomeFilterSelector
          onChange={(e: string | null | Date) => handleInputChange("depart", e)}
          label="Depart"
          isDate={true}
          rounded=""
          date={inputs.depart}
          value={inputs.from}
        />
        <HomeFilterSelector
          onChange={(e: string | null | Date) => handleInputChange("adults", e)}
          label="Adults"
          type="number"
          rounded=""
          value={inputs.adults}
        />
        <HomeFilterSelector
          onChange={(e: string | null | Date) =>
            handleInputChange("flightClass", e)
          }
          label="Class"
          isSelector={true}
          options={selectOptions}
          rounded="rounded-r-xl"
          value={inputs.flightClass}
        />
        <div className="flex items-center">
          <Button onClick={onSumbit} variant="contained">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePageFilter;
