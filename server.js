const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
require("./config/database");

const app = express();

const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/", require("./routes/authRoutes"));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
