require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db/db");
const Router = require("./routers/router");

// Custom CORS Middleware
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://quoted-gold.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Handle Preflight Requests
app.options("*", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://quoted-gold.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204); // No content
});

app.use(express.json());
app.use(Router);

db &&
  app.listen(3000, () => {
    console.log("Server Started");
  });
