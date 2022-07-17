require("dotenv").config();

const express = require("express");

const app = express();

const mongoose = require("mongoose");

const Booksroute = require("./routers/books")

//  ----------------  Middlewares  ----------------------------

app.use(express.json());
app.use(express.urlencoded ({extended:true}));


//  ----------------     Router    ----------------------------

app.use('/api/books', Booksroute)




//  ----------------  Connection  ----------------------------

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
  console.log(`connected to mongoDb Atlas`);
}).catch(error => {
    console.log(`something went wrong`, error);
})

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
 