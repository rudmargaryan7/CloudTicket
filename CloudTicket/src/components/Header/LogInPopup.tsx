import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { FC } from "react";
import SelectGroup from "../SelectGroupCustom";
import useQuery from "@/utils/query";
import { loginUser, registerUser } from "@/api";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/features/auth/authReducer";
import axios from "axios";

type RegSuccessType = {
  payload: {
    login: string;
    email: string;
    password: string;
    liked: string[];
  };
  token?: string;
};

const LogInPopup: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isSwitched, setIsSwitched] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [logInData, setLogInData] = React.useState({
    login: "",
    password: "",
    confirmPassword: "",
    isRemember: false,
    email: "",
  });

  const handleSuccess = (payload: RegSuccessType) => {
    if (payload.token) {
      localStorage.setItem("token", payload.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${payload.token}`;
    }
    dispatch(setUser(payload.payload));
    onClose();
  };

  const { onSumbit } = useQuery(registerUser, logInData, (data: object) => {
    handleSuccess(data as RegSuccessType);
  });

  const { onSumbit: login } = useQuery(
    loginUser,
    {
      email: logInData.email,
      password: logInData.password,
      isRemember: logInData.isRemember,
    },
    (data: object) => {
      handleSuccess(data as RegSuccessType);
    }
  );

  const handleChangeData = (name: string, value: string | boolean) => {
    setLogInData({
      ...logInData,
      [name]: value,
    });
  };

  const handleSumbitReg = () => {
    onSumbit();
  };

  return (
    <div className="modal">
      <div
        className="modal__close text-2xl text-tertiary-color"
        onClick={onClose}
      >
        X
      </div>
      <div className="flex flex-col gap-5 items-center">
        <SelectGroup
          fields={[
            { text: "Login", value: "login" },
            { text: "Registration", value: "reg" },
          ]}
          onSelect={(e) => {
            setLogInData({
              login: "",
              password: "",
              confirmPassword: "",
              isRemember: false,
              email: "",
            });

            setIsSwitched(e !== "login");
          }}
          selectedField={isSwitched ? "reg" : "login"}
        />
        <div className="flex w-full flex-col gap-3">
          {!isSwitched ? (
            <>
              <TextField
                value={logInData.email}
                variant="outlined"
                label="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeData("email", e.target.value);
                }}
                className="w-full"
              />
              <TextField
                value={logInData.password}
                variant="outlined"
                type="password"
                label="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeData("password", e.target.value);
                }}
                className="w-full"
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={logInData.isRemember}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeData("isRemember", e.target.checked);
                      }}
                    />
                  }
                  label="Is Remember"
                />
              </FormGroup>
              <Button variant="contained" onClick={login}>
                Log In
              </Button>
            </>
          ) : (
            <>
              <TextField
                value={logInData.login}
                variant="outlined"
                label="Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeData("login", e.target.value);
                }}
                className="w-full"
              />
              <TextField
                value={logInData.email}
                variant="outlined"
                label="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeData("email", e.target.value);
                }}
                className="w-full"
              />
              <TextField
                value={logInData.password}
                variant="outlined"
                type="password"
                label="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeData("password", e.target.value);
                }}
                className="w-full"
              />
              <TextField
                value={logInData.confirmPassword}
                variant="outlined"
                type="password"
                label="Confirm Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeData("confirmPassword", e.target.value);
                }}
                className="w-full"
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={logInData.isRemember}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeData("isRemember", e.target.checked);
                      }}
                    />
                  }
                  label="Is Remember"
                />
              </FormGroup>

              <Button variant="contained" onClick={handleSumbitReg}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogInPopup;
