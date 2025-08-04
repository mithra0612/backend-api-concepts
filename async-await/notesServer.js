// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();
// const Note = require("./models/model");
// app.use(express.json());

// mongoose
//   .connect("mongodb://localhost:27017/BackendDB")
//   .then(() => console.log("MongoDB is connected successfully."))
//   .catch(() => console.log("Error in DB connection"));

// app.post("/api/notes", async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     if (!title || !content) {
//       res.status(400).send("Title and content both are required.");
//     }
//     const newNote = new Note({ title, content });
//     await newNote.save();
//     res
//       .status(201)
//       .json({ message: "Note created successfully", note: newNote });
//   } catch (err) {
//     console.log(err);
//     res.status(200).send("Error");
//   }
// });

// app.get("/api/notes", async (req, res) => {
//   try {
//     const notes = await Note.find();
//     res.status(200).json(notes);
//   } catch (err) {
//     console.log(err);
//     res.status(200).send("Error");
//   }
// });

// app.listen(3000, () => console.log("Connected in port 3000"));
