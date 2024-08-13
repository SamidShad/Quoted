require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db/db");
const cors = require("cors");
const Router = require("./routers/router");

const corsOptions = {
  origin: "https://quoted-gold.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(Router);

db &&
  app.listen(3000, () => {
    console.log("Server Started");
  });
