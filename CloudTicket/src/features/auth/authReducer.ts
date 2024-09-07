// src/features/featureName/featureSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type FilterActionType = {
  exchange: string;
  country: string;
  rate?: number;
};

export type UserType = {
  email: string;
  liked: string[];
  login: string;
};

interface AuthInterface {
  exchange: string;
  country: string;
  rate: number;
  app: UserType | null;
}

const initialState: AuthInterface = {
  exchange: "",
  country: "",
  rate: 0,
  app: null,
};

const authReducer = createSlice({
  name: "feature",
  initialState,
  reducers: {
    filter: (state, action: PayloadAction<FilterActionType>) => {
      return {
        ...state,
        exchange: action.payload.exchange,
        country: action.payload.country,
        rate: action.payload.rate || state.rate,
      };
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      return {
        ...state,
        app: action.payload,
      };
    },
    logOutAction: (state) => {
      return {
        ...state,
        app: null,
      };
    },
  },
});

export const { filter, setUser, logOutAction } = authReducer.actions;

export default authReducer.reducer;
