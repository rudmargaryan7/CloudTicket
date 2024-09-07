import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { FC } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface HomeFilterSelectorInterface {
  rounded: string;
  label: string;
  value: string | number;
  onChange: (newValue: string | Date | null) => void;
  isSelector?: boolean;
  date?: Date | null;
  options?: { value: string; label: string }[];
  isDate?: boolean;
  type?: string;
  disabled?: boolean;
}

const HomeFilterSelector: FC<HomeFilterSelectorInterface> = ({
  label,
  rounded,
  value,
  isDate = false,
  type = "string",
  date,
  onChange,
  disabled,
  options,
  isSelector,
}) => {
  if (isSelector) {
    return (
      <div
        className={`flex w-full justify-center flex-col gap-2 bg-white py-3 px-3 ${rounded}`}
      >
        <div className="text-base">{label}</div>
        <Select
          id="demo-simple-select"
          value={`${value}`}
          onChange={(event: SelectChangeEvent) => {
            onChange(`${event.target.value}`);
          }}
        >
          {options &&
            options.map((e) => {
              return (
                <MenuItem key={e.value} value={e.value}>
                  {e.label}
                </MenuItem>
              );
            })}
        </Select>
      </div>
    );
  }
  if (isDate) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div
          className={`flex w-full justify-center flex-col gap-2 bg-white py-3 pt-4 px-3 ${rounded}`}
        >
          <DatePicker
            label="Depart"
            value={date}
            onChange={(e: Date | null) => onChange(e)}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        </div>
      </LocalizationProvider>
    );
  }
  return (
    <div
      className={`flex w-full flex-col justify-center gap-2 bg-white py-3 px-3 ${rounded}`}
    >
      <div className="text-base">{label}</div>
      <TextField
        value={value}
        type={type}
        disabled={disabled}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        }}
        variant="standard"
      />
    </div>
  );
};

export default HomeFilterSelector;
