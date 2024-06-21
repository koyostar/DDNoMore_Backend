const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
  allowedHeaders: "Content-Type, Authorization",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(require("./config/checkToken"));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
