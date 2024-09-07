import React, { FC } from "react";
import HomePageFilter from "./HomePageComponents/Filter";
import HomeFlightDetails from "./HomePageComponents/FlightDetails";
import HomeFAQ from "./HomePageComponents/FAQ";

const HomePage: FC = () => {
  return (
    <div className=" w-full flex flex-col	">
      <HomePageFilter />
      <HomeFlightDetails />
      <HomeFAQ />
    </div>
  );
};

export default HomePage;
