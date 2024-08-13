require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db/db");
const cors = require("cors");
const Router = require("./routers/router");

app.use(cors());
app.use(express.json());
app.use(Router);

db &&
  app.listen(3000, () => {
    console.log("Server Started");
  });
