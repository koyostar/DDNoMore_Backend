const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  credentials: true,
  origin: "https://dd-no-more.vercel.app",
  allowedHeaders: "Content-Type, Authorization",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
