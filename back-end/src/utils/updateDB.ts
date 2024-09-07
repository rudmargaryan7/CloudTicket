import { Ticket } from "../models/Ticket";
import moment from "moment";

async function updateDB() {
  try {
    const currentTime = moment();
    const data = await Ticket.find({ accessible: true });
    data.map(async (e) => {
      const itemDate = moment(e.date);
      const isOlder = currentTime.isAfter(itemDate);
      if (isOlder) {
        e.accessible = false;
        await e.save();
      }
    });
  } catch (error) {}
}
export default updateDB;
