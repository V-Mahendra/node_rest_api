require("dotenv").config();

const express = require("express");

const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
  console.log(`connected to mongoDb Atlas`);
}).catch(error => {
    console.log(`something went wrong`, error);
})

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
