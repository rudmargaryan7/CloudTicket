import React, { FC, useState } from "react";
import "./index.scss";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import countries from "@/utils/countyCodes.json";
import exchanges from "@/utils/countryExchange.json";
import { filter } from "@/features/auth/authReducer";
import { fetchExchangeRate, initHomePageTickets } from "@/utils/initilization";
type filterPopupType = {
  onClose: () => void;
};

const FilterPopup: FC<filterPopupType> = ({ onClose }) => {
  const { country, exchange } = useAppSelector((state) => state.auth);
  const [inputs, setInputs] = useState({
    country,
    exchange,
  });
  const dispatch = useAppDispatch();
  const handleChangeInput = (name: string, value: string) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (exchange !== inputs.exchange) {
      const rate = await fetchExchangeRate(inputs.exchange);
      dispatch(filter({ ...inputs, rate }));
    }
    if (country !== inputs.country) {
      dispatch(filter(inputs));
      initHomePageTickets(dispatch, inputs.country);
    }
    onClose();
  };

  return (
    <div className="modal">
      <div
        className="modal__close text-2xl text-tertiary-color"
        onClick={onClose}
      >
        X
      </div>
      <div className="text-xl">Regional settings</div>
      <div className="flex flex-col mt-8 gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-md font-semibold	">Country / Region</div>
          <div className="text-md">
            Selecting the country you’re in will give you local deals and
            information.
          </div>
          <Select
            id="demo-simple-select"
            value={`${inputs.country}`}
            onChange={(event: SelectChangeEvent) => {
              handleChangeInput("country", `${event.target.value}`);
            }}
          >
            {countries.map((e) => {
              return (
                <MenuItem key={e.value} value={e.value}>
                  {e.label}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-md font-semibold	">Currency</div>
          <Select
            id="demo-simple-select"
            value={`${inputs.exchange}`}
            onChange={(event: SelectChangeEvent) => {
              handleChangeInput("exchange", `${event.target.value}`);
            }}
          >
            {exchanges.map((e) => {
              return (
                <MenuItem key={e.value} value={e.value}>
                  {e.label}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </div>
    </div>
  );
};

export default FilterPopup;
