import { createTicket } from "@/api";
import useQuery from "@/utils/query";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { FC, useState } from "react";

type ClassTypes = "economy" | "premium-economy" | "business" | "first";

export type InputsTypes = {
  from: {
    city: string;
    country: string;
    Airport: string;
  };
  to: {
    city: string;
    country: string;
    Airport: string;
  };
  date: string;
  time: string;
  km: number;
  image?: string;
  _id?: string;
  price: number;
  liked?: boolean;
  class: "economy" | "premium-economy" | "business" | "first";
};

const defaultParams: InputsTypes = {
  from: {
    country: "",
    city: "",
    Airport: "",
  },
  to: {
    country: "",
    city: "",
    Airport: "",
  },
  date: "",
  class: "first",
  price: 100,
  time: "",
  km: 20,
};

const AdminNewTicket: FC = () => {
  const [inputs, setInputs] = useState<InputsTypes>(defaultParams);

  const { onSumbit } = useQuery(createTicket, inputs, () => {
    setInputs(defaultParams);
  });

  const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const split = name.split(".");
    setInputs({
      ...inputs,
      [split[0]]: {
        ...inputs[split[0] as "from" | "to"],
        [split[1]]: value,
      },
    });
  };

  const handleCreate = () => {
    onSumbit();
  };

  return (
    <div className="flex flex-col gap-6 py-4 px-5 items-center">
      <div className="text-2xl text-tertiary-color">Create New Ticket</div>
      <div className="flex flex-col gap-2 w-full">
        <div className="text-xl">From</div>
        <div className="flex gap-2">
          <TextField
            name="from.country"
            placeholder="Country"
            className="w-full"
            value={inputs.from.country}
            onChange={handleFormChange}
          />
          <TextField
            name="from.city"
            placeholder="City"
            className="w-full"
            value={inputs.from.city}
            onChange={handleFormChange}
          />
          <TextField
            name="from.Airport"
            placeholder="Airport"
            className="w-full"
            value={inputs.from.Airport}
            onChange={handleFormChange}
          />
        </div>

        <div className="text-xl">To</div>
        <div className="flex gap-2">
          <TextField
            name="to.country"
            placeholder="Country"
            className="w-full"
            value={inputs.to.country}
            onChange={handleFormChange}
          />
          <TextField
            name="to.city"
            placeholder="City"
            className="w-full"
            value={inputs.to.city}
            onChange={handleFormChange}
          />
          <TextField
            name="to.Airport"
            placeholder="Airport"
            className="w-full"
            value={inputs.to.Airport}
            onChange={handleFormChange}
          />
        </div>
        <div className="text-xl">Time and KM</div>
        <div className="flex gap-2">
          <TextField
            name="time"
            label="Time to road"
            className="w-full"
            value={inputs.time}
            onChange={handleChangeItem}
          />
          <TextField
            name="km"
            label="KM"
            type="number"
            className="w-full"
            value={inputs.km}
            onChange={handleChangeItem}
          />
        </div>
        <TextField
          name="date"
          label="date"
          type="datetime-local"
          className="w-full"
          value={inputs.date}
          onChange={handleChangeItem}
        />
        <TextField
          name="image"
          label="URL Image"
          type="text"
          className="w-full"
          value={inputs.image}
          onChange={handleChangeItem}
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          className="w-full"
          value={inputs.price}
          onChange={handleChangeItem}
        />
        <div className="flex flex-col gap-1">
          <div className="text-md">Class</div>
          <Select
            name="class"
            value={inputs.class}
            onChange={(a: SelectChangeEvent) =>
              setInputs((e) => ({ ...e, class: a.target.value as ClassTypes }))
            }
          >
            <MenuItem value={"first"}>First</MenuItem>{" "}
            <MenuItem value={"premium-economy"}>Premium Economy</MenuItem>{" "}
            <MenuItem value={"business"}>Business Class</MenuItem>{" "}
            <MenuItem value={"economy"}>Economy</MenuItem>{" "}
          </Select>
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNewTicket;
