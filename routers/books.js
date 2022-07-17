const express = require("express");
const router = express.Router();
const { Book, validateBook } = require("../models/books");

//POST: CREATE A NEW BOOK
router.post("/", async (req, res) => {
  const error = await validateBook(req.body);
  if (error.message) res.status(400).send(error.message);

  data = new Book({
    name: req.body.bookName,
    author: {
      name: req.body.authorName,
      age: req.body.authorAge,
    },
    genre: req.body.genre,
  });

  data
    .save()
    .then((book) => {
      res.send(book);
    })
    .catch((error) => {
      res.status(500).send("Book was not stored in db");
    });
});

// ------------------------------ GET ALL BOOKS --------------------

router.get("/", (req, resp) => {
  Book.find()
    .then((book) => resp.send(book))
    .catch((error) => {
      resp.status(500).send("something went wrong");
    });
});

//  --------------------------------GET BOOK BY ID ---------------------

router.get("/:bookId", async (req, resp) => {
  const data = await Book.findById(req.params.bookId);
  if (!data) resp.status(404).send("Bok Not Found");
  resp.send;
});

//  --------------------------------UPDATED BOOKS ---------------------

router.put("/:bookId", async (req, resp) => {
  const UpdatedBooks = await Book.findByIdAndUpdate(
    req.params.bookId,
    {
      name: req.body.bookName,
      author: {
        name: req.body.authorName,
        age: req.body.authorAge,
      },
      genre: req.body.genre,
    },
    { new: true }
  );

  if (!UpdatedBooks) resp.status(404).send("Books not found");
  resp.send(UpdatedBooks);
});


//  -------------------------------- Delete  ---------------------

router.delete("/:bookId" , async ( req , resp) =>{
  const data = await Book.findByIdAndRemove(req.params.bookId)
  if(!data) resp.status(404).send("BookId Not Found")
  resp.send(data)
})

module.exports = router;
