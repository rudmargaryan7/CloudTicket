import { useAppSelector } from "@/app/hooks";
import React from "react";

const MyAccountInfo: React.FC = () => {
  const app = useAppSelector((state) => state.auth.app);
  console.log(app);
  return (
    <div className="flex w-full pt-10 items-center flex-col gap-3">
      <div className="myaccount__logo">{app?.login[0]}</div>
      <div className="text-2xl">{app?.login}</div>
      <div className="text-xl">Favorite:{app?.liked.length}</div>
    </div>
  );
};

export default MyAccountInfo;
