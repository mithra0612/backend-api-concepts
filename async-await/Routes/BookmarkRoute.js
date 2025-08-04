const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Bookmark = require("../Models/bookmarkModel");
router.post("/bookmarks", async (req, res) => {
  try {
    const { title, url, description } = req.body;
    if (!title || !url || !description) {
      return res
        .status(400)
        .send("Missing fields, must have Title, URL and Description");
    }
    const bookmark = new Bookmark({ title, url, description });
    await bookmark.save();
    res.status(201).json({ message: "Bookmark added.", bookmark });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error in creating bookmark");
  }
});

router.get("/bookmarks", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    console.log("Fetched Bookmarks");
    res.status(200).json(bookmarks);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error in fetching bookmark");
  }
});

router.delete("/bookmarks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookmark = await Bookmark.findByIdAndDelete(id);
    if (bookmark == null) {
      return res.status(404).send("ID not found");
    }
    res.status(200).json(bookmark);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error in deleting bookmark.");
  }
});
module.exports = router;
