import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import {
  CreateTicket,
  disLike,
  getActiveTickets,
  getFavorits,
  getHistoryTickets,
  getTicketsByCountryName,
  likeTicket,
  SearchTickets,
} from "./service";

const ticketRouter = Router();

ticketRouter.post(
  "/create",
  [
    body("from").notEmpty(),
    body("to").notEmpty(),
    body("date").notEmpty(),
    body("class").notEmpty(),
    body("price").notEmpty().isInt({ min: 20, max: 100 }),
  ],
  (req: Request, res: Response) => {
    const data = validationResult(req);
    if (data.isEmpty()) {
      return CreateTicket(req, res);
    }
    res.status(400).send({
      error: {
        type: "validator",
        errors: data.array(),
      },
    });
  }
);

ticketRouter.get("/active", getActiveTickets);
ticketRouter.get("/history", getHistoryTickets);
ticketRouter.post("/init", getTicketsByCountryName);
ticketRouter.post("/filter", SearchTickets);
ticketRouter.post("/like", likeTicket);
ticketRouter.post("/dislike", disLike);
ticketRouter.get("/favorits", getFavorits);

export default ticketRouter;
