import config from "config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import ticketRoutes from "./routes/ticket/router";
import authRoutes from "./routes/auth/router";
import AuthMiddelware from "./utils/jwt/authMiddelware";
import updateDB from "./utils/updateDB";

const port = config.get("server.PORT");
const url: string = config.get("database.mongoURL");
const corsOptions = {
  origin: "http://localhost:5173", // Restrict access to your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

// middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use(AuthMiddelware);

app.use("/api/auth", authRoutes);
app.use("/api/v1", ticketRoutes);

// START
mongoose.connect(url, {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Successful connection
db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, async () => {
    console.log("Project has been started!");

    updateDB();
  });
});
