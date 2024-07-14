const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("successfully connected to mongoDb atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to mongoDb atlas!");
      console.log(error);
    });
};

export default dbConnect;
