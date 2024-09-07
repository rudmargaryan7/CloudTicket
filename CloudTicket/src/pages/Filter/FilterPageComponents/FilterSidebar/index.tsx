import { filterTickets } from "@/api";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeInput, setFilteredTickest } from "@/features/tickets";
import HomeFilterSelector from "@/pages/Home/HomePageComponents/FilterSelector";
import useQuery from "@/utils/query";
import { Button } from "@mui/material";
import React from "react";

const selectOptions = [
  { value: "economy", label: "Economy" },
  { value: "premium-economy", label: "Premium Economy" },
  { value: "business", label: "Business Class" },
  { value: "first", label: "First Class" },
];

const FilterPageSideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputs = useAppSelector((state) => state.tickets.filter);
  const handleInputChange = (name: string, value: string | Date | null) => {
    dispatch(
      changeInput({
        name,
        value,
      })
    );
  };
  const { onSumbit } = useQuery(filterTickets, inputs, (data) => {
    dispatch(setFilteredTickest(data?.tickets));
  });
  return (
    <div className="flex w-[40%] max-w-[350px] flex-col gap-4 border-2 py-5 border-r-tertiary-color">
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
        onChange={(e: string | null | Date) => handleInputChange("class", e)}
        label="Class"
        isSelector={true}
        options={selectOptions}
        rounded="rounded-r-xl"
        value={inputs.flightClass}
      />
      <div className="flex justify-center">
        <Button onClick={onSumbit} variant="contained">
          Search
        </Button>
      </div>
    </div>
  );
};

export default FilterPageSideBar;
