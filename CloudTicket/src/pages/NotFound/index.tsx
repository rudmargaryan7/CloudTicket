import React, { FC } from "react";
import logo from "@/assets/images/logo.png";
import error from "@/assets/images/notfound.svg";
import "./index.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const NotFound: FC = () => {
  return (
    <div className="flex flex-col notfound">
      <img src={logo} alt="" className="notfound-logo" />
      <div className="notfound-title">Page not found</div>
      <div className="notfound-text">
        With CloudTicket you can go anywhere. But first you need to go back to
        the homepage.
      </div>
      <div className="flex justify-center ">
        <Button variant="contained">
          <Link to="/">Go Back</Link>
        </Button>
      </div>
      <img src={error} alt="" className="notfound-image" />
    </div>
  );
};

export default NotFound;
