const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then((connection) => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB");
      });
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }
};

module.exports = getConnection;
