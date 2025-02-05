require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const app = require("./src/app");

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    const server = http.createServer(app);
    server.listen(PORT, () => {
      `server started${PORT}`;
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
