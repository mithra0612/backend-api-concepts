const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const orders = [];

router.post("/orders", (req, res) => {
  try {
    const { customerName, items } = req.body;
    if (!customerName || customerName.trim() === "") {
      return res.status(400).json({ message: "Customer name should not be empty" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items array is required and cannot be empty" });
    }
    for (let i = 0; i < items.length; i++) {
      const { product, quantity } = items[i];

      if (!product || product.trim() === "") {
        return res.status(400).json({ message: `Product at index ${i} is empty` });
      }

      if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({ message: `Quantity at index ${i} is invalid or negative` });
      }
    }
      
    const order = {
      id: uuidv4(),
      customerName: customerName.trim(),
      items,
      createdAt: new Date().toISOString(),
    };

    orders.push(order);
    res.status(201).json(order);

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
