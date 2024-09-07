import { InputsTypes } from "@/pages/Admin/Components/AdminNewTicket";
import { FC, useEffect, useState } from "react";
import "./index.scss";
import moment from "moment";
import { Button, Modal, Tooltip } from "@mui/material";
import { useAppSelector } from "@/app/hooks";
import HeartIcon, { FilledHeartIcon } from "../../assets/icons/HeartIcon";
import LogInPopup from "../Header/LogInPopup";
import { disLike, likeTicket } from "@/api";
import useQuery from "@/utils/query";

const Ticket: FC<{ data: InputsTypes; isHistory?: boolean }> = ({
  data,
  isHistory,
}) => {
  const {
    from,
    to,
    image,
    price,
    time,
    km,
    _id,
    date,
    liked,
    class: ClassBort,
  } = data;
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const { exchange, rate } = useAppSelector((state) => state.auth);
  const app = useAppSelector((state) => state.auth.app);
  const [currentPrice, setCurrentPrice] = useState<number>();
  const dateToObject = moment(date);
  const [innerLike, setInnerLike] = useState<boolean>(liked || false);

  //Like DisLike Queries
  const { onSumbit: like } = useQuery(likeTicket, { id: _id || "" }, () => {
    setInnerLike(true);
  });
  const { onSumbit: disLikeTicket } = useQuery(
    disLike,
    { id: _id || "" },
    () => {
      setInnerLike(false);
    }
  );

  const getTooltipText = (type: "from" | "to") => {
    if (type === "from") {
      return `${from.country},${from.city},${from.Airport.split(".")[1]}`;
    }
    return `${to.country},${to.city},${to.Airport.split(".")[1]}`;
  };

  useEffect(() => {
    setCurrentPrice(Math.floor(rate * price));
  }, [exchange]);

  const getTimeToArrive = () => {
    const splitedTime = time.split(" ");
    const hours = splitedTime[0].split("h");
    const minutes = splitedTime[1] ? splitedTime[1].split("m") : [0];
    const newDate = moment(date)
      .add(hours[0], "hours")
      .add(minutes[0] || 0, "minutes");
    return `${newDate.format("hh:mm A")}`;
  };

  const handleLike = () => {
    if (!app?.email) {
      setIsOpenPopup(true);
    }
    if (!innerLike) {
      like();
      return;
    }
    disLikeTicket();
  };

  return (
    <div className="flex w-full relative border-color-primary-color py-4 px-2 rounded-xl border-2 justify-between ticket items-center">
      <Modal open={isOpenPopup} onClose={() => setIsOpenPopup(false)}>
        <div>
          <LogInPopup onClose={() => setIsOpenPopup(false)} />
        </div>
      </Modal>
      <img src={image} alt="" className="rounded-xl	" />
      <div className="ticket__center flex items-center gap-4">
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="text-xl">{dateToObject.format("hh:mm A")}</div>
          <Tooltip title={getTooltipText("from")}>
            <div className="text-md text-color-400 cursor-pointer">
              {from.Airport.split(".")[0]}
            </div>
          </Tooltip>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-500	">
          {time}
          <div className="line"></div>
          {km}km
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="text-xl">{getTimeToArrive()}</div>
          <Tooltip title={getTooltipText("to")}>
            <div className="text-md text-color-400 cursor-pointer">
              {to.Airport.split(".")[0]}
            </div>
          </Tooltip>
        </div>
      </div>
      {!isHistory && (
        <div className="flex flex-col items-center pr-3 gap-2 mt-5">
          <div className="like__button" onClick={handleLike}>
            {innerLike ? <FilledHeartIcon /> : <HeartIcon />}
          </div>
          {currentPrice?.toLocaleString()} {exchange}
          <Button variant="contained">Select </Button>
        </div>
      )}
    </div>
  );
};

export default Ticket;
