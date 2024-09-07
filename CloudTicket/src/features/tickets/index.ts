import { InputsTypes } from "@/pages/Admin/Components/AdminNewTicket";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  filter: {
    from: string;
    to: string;
    adults: number;
    depart: Date | null;
    flightClass: string;
  };
  filterTickets: InputsTypes[];
  homeTickets: InputsTypes[];
};

type ChangeInputActionType = {
  name: string;
  value: string | Date | null;
};

const initialState: initialStateType = {
  filter: {
    from: "",
    to: "",
    adults: 2,
    depart: null,
    flightClass: "economy",
  },
  homeTickets: [],
  filterTickets: [],
};

const TicketsReducer = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    changeInput: (state, action: PayloadAction<ChangeInputActionType>) => {
      const { name, value } = action.payload;
      if (name === "adults" && +(value || 0) > 7) {
        return state;
      }
      return {
        ...state,
        filter: {
          ...state.filter,
          [name]: value,
        },
      };
    },
    initMainTickets: (state, action) => {
      return {
        ...state,
        homeTickets: action.payload,
      };
    },
    setFilteredTickest: (state, action) => {
      return {
        ...state,
        filterTickets: action.payload,
      };
    },
  },
});

export const { changeInput, setFilteredTickest, initMainTickets } =
  TicketsReducer.actions;

export default TicketsReducer.reducer;
