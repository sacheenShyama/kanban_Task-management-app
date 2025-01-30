const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Routes = require("./routes/route");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", Routes);

module.exports = app;
