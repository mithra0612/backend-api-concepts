const express = require("express");
// const mongoose  require('mongoose');
const Notification = require("../Models/NotificationsModel");
const router = express.Router();

router.post("/notifications", async (req, res) => {
  try {
    const { title, message, type } = req.body;
    if (!title || !message || !type) {
      return res
        .status(404)
        .json({
          message:
            "Missing fields, notification must have title, message and type.",
        });
    }
    const notification = new Notification({ title, message, type });
    const newNotification = await notification.save();
    return res.status(201).json({
      message: "Notification created.",
      newNotification,
    });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ message: "Error in creating notification." });
  }
});

router.patch("/notifications/:id/read", async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.updateOne({ _id: id }, { $set: { read: true } });
  } catch (err) {
    console.error(err);
  }
});


module.exports = router;
