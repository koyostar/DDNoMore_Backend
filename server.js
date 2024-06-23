const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

const HOST = process.env.HOST_SITE_URL;

const corsOptions = {
  credentials: true,
  origin: `${HOST}`,
  allowedHeaders: "Content-Type, Authorization",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/taskRoutes"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
