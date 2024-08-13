const db = require("mongoose");

db.connect(process.env.MONGO_URI);

module.exports = db;
