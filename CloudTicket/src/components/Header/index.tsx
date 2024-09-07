import React, { FC, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Button, Modal } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getExchangeCountry,
  getNameCountry,
} from "../../utils/getLabelsByCountry";
import LogInPopup from "./LogInPopup";
import "./index.scss";
import FilterPopup from "./FilterPopup";
import { logout } from "@/utils/logout";
import { Link } from "react-router-dom";

const Header: FC = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenFilterPopup, setIsOpenFilterPopup] = useState(false);
  const { country, exchange, app } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between py-2 px-4 bg-secondary-color w-full">
      <Link to="/">
        <img
          src={logo}
          alt=""
          width="50%"
          height="50%"
          style={{ objectFit: "contain" }}
        />
      </Link>
      <div className="flex gap-2">
        {country && exchange && (
          <Button
            variant="contained"
            onClick={() => setIsOpenFilterPopup(true)}
          >
            {getNameCountry(country)} | {getExchangeCountry(exchange)}
          </Button>
        )}
        {app ? (
          <div className="flex gap-2 items-center">
            <div className="text-xl font-smeilbold">
              <Link to={"account"}>{app.login}</Link>
            </div>
            <Button size="small" onClick={() => logout(dispatch)}>
              Log Out
            </Button>
          </div>
        ) : (
          <Button variant="pr-medium" onClick={() => setIsOpenPopup(true)}>
            Login
          </Button>
        )}
      </div>
      <Modal open={isOpenPopup} onClose={() => setIsOpenPopup(false)}>
        <div>
          <LogInPopup onClose={() => setIsOpenPopup(false)} />
        </div>
      </Modal>
      <Modal
        open={isOpenFilterPopup}
        onClose={() => setIsOpenFilterPopup(false)}
      >
        <div>
          <FilterPopup onClose={() => setIsOpenFilterPopup(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default Header;
