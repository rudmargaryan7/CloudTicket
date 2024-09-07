import { Request, Response } from "express";
import { generatorError } from "../../utils/errorGenerator";
import { Ticket } from "../../models/Ticket";
import { User } from "../../models/User";

export const CreateTicket = async (req: Request, res: Response) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    return res.status(200).send({ text: "Created successfuly." });
  } catch (error) {
    return res.status(400).send(generatorError(JSON.stringify(error)));
  }
};

export const getActiveTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find({ accessible: true });
    const user = req.user;
    if (user?._id) {
      const ticketss = tickets.map((e) => ({
        from: e.from,
        to: e.to,
        date: e.date,
        class: e.class,
        price: e.price,
        image: e.image,
        time: e.time,
        km: e.km,
        _id: e._id,
        liked: user.liked.includes(`${e._id}`),
      }));
      return res.status(200).send({ payload: ticketss });
    }
    return res.status(200).send({ payload: tickets });
  } catch (error) {
    return res.status(400).send(generatorError(JSON.stringify(error)));
  }
};

export const getHistoryTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find({ accessible: false });
    const user = req.user;
    if (user?._id) {
      const ticketss = tickets.map((e) => ({
        from: e.from,
        to: e.to,
        date: e.date,
        class: e.class,
        price: e.price,
        image: e.image,
        time: e.time,
        km: e.km,
        _id: e._id,
        liked: user.liked.includes(`${e._id}`),
      }));
      return res.status(200).send({ payload: ticketss });
    }
    return res.status(200).send({ payload: tickets });
  } catch (error) {
    return res.status(400).send(generatorError(JSON.stringify(error)));
  }
};

export const getTicketsByCountryName = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const user = req.user;
    const tickets = await Ticket.find({
      $or: [{ "from.country": name }, { "from.city": name }],
      $and: [{ accessible: true }],
    });
    if (user?._id) {
      const ticketss = tickets.map((e) => ({
        from: e.from,
        to: e.to,
        date: e.date,
        class: e.class,
        price: e.price,
        image: e.image,
        time: e.time,
        km: e.km,
        _id: e._id,
        liked: user.liked.includes(`${e._id}`),
      }));
      return res.status(200).send({ payload: ticketss });
    }
    return res.status(200).send({ payload: tickets });
  } catch (error) {
    return res.status(400).send(generatorError(JSON.stringify(error)));
  }
};

export const SearchTickets = async (req: Request, res: Response) => {
  const { from, to, depart, flightClass } = req.body;
  const user = req.user;
  const query: any = {
    // accessibility: true,
  };

  // Partial matching for 'from' field
  if (from) {
    query["from.country"] = { $regex: from, $options: "i" }; // Case-insensitive partial match
  }

  // Partial matching for 'to' field
  if (to) {
    query["to.country"] = { $regex: to, $options: "i" }; // Case-insensitive partial match
  }

  // Exact match for 'depart' field (Date comparison)
  if (depart) {
    query["date"] = { $regex: depart, $options: "i" };
  }

  // Partial matching for 'class' field
  if (flightClass) {
    query.class = { $regex: flightClass, $options: "i" }; // Case-insensitive partial match
  }
  try {
    const tickets = await Ticket.find(query);
    if (user?._id) {
      const ticketss = tickets.map((e) => ({
        from: e.from,
        to: e.to,
        date: e.date,
        class: e.class,
        price: e.price,
        image: e.image,
        time: e.time,
        km: e.km,
        _id: e._id,
        liked: user.liked.includes(`${e._id}`),
      }));
      return res.status(200).send({ tickets: ticketss });
    }
    return res.send({ tickets }).status(200);
  } catch (error) {
    return res.send(generatorError(JSON.stringify(error))).status(400);
  }
};

export const likeTicket = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user?._id) {
    return res.status(400).send(generatorError("User not found."));
  }
  const { id } = req.body;
  if (user.liked.includes(id)) {
    return res.status(400).send(generatorError("Already liked"));
  }
  try {
    const update = await User.findOneAndUpdate(
      { email: user.email },
      { liked: [...user.liked, id] }
    );
    return res.status(200).send({ text: "Added to favorite list." });
  } catch (error) {
    return res.send(generatorError(JSON.stringify(error))).status(400);
  }
};

export const disLike = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user?._id) {
    return res.status(400).send(generatorError("User not found."));
  }
  const { id } = req.body;
  if (!user.liked.includes(id)) {
    return res.status(400).send("Ticket wasnt liked");
  }
  try {
    const update = await User.findOneAndUpdate(
      { email: user.email },
      { liked: user.liked.filter((e) => e !== id) }
    );
    return res.status(200).send({ text: "Removed from favorite list." });
  } catch (error) {
    return res.send(generatorError(JSON.stringify(error))).status(400);
  }
};

export const getFavorits = async (req: Request, res: Response) => {
  const { user } = req;
  try {
    const ids = user?.liked;

    const tickets = await Ticket.find({ _id: { $in: ids } });
    return res.status(200).send({ tickets: tickets });
  } catch (error) {
    console.log(error);
    return res.send(generatorError(JSON.stringify(error))).status(400);
  }
};
