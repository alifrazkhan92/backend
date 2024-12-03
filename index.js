require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const getConnection = require("./utils/getConnection");
const errorHandler = require("./middleware/errorHandler");
const accountRoutes = require("./routes/account");

const app = express();
const port = process.env.PORT || 5052;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static("public"));

// Routes
app.use("/user", accountRoutes);

app.use(errorHandler);
getConnection();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
