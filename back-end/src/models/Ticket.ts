import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  from: {
    city: String,
    country: String,
    Airport: String,
  },
  to: {
    city: String,
    country: String,
    Airport: String,
  },
  date: String,
  class: String,
  price: Number,
  image: {
    type: String,
    default:
      "https://howthingsfly.si.edu/sites/default/files/image-large/285744main_PIA11066_full_lg.jpg",
  },
  time: String,
  km: Number,
  accessible: { type: Boolean, default: true },
});

// Create a model (this will connect to the 'ticket' collection in the database)
export const Ticket = mongoose.model("Ticket", ticketSchema);
