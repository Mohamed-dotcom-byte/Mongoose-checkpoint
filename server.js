const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 5000;
require("dotenv").config({ path: "./config/.env" });
const mongoUrl = process.env.MONGO_URL;

//connect DB to the server
mongoose.connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    else console.log("DB is connected");
  }
);
app.use("/", require("./routes/userRoutes"));
// creating the server
app.listen(port, (err) => {
  if (err) throw err;
  else console.log(`server is running on port ${port}`);
});
