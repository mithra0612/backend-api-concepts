const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const products = [];

router.post("/products", (req, res) => {
  const { name, price, category } = req.body;

  if (!name || price === undefined || !category) {
    return res.status(400).json({
      error: "Field is missing",
    });
  }

  const nameValid = name.length >= 3;
  const priceValid = price >= 0;
  const categoryValid = typeof category === "string";

  if (nameValid && priceValid && categoryValid) {
    const product = {
      id: uuidv4(),
      name,
      price,
      category,
      createdAt: new Date().toISOString(),
    };
    products.push(product);

    return res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } else {
    if (!nameValid) {
      return res.status(400).send("Name should have at least 3 characters.");
    }
    if (!priceValid) {
      return res.status(400).send("Price must be a non-negative number.");
    }
    if (!categoryValid) {
      return res.status(400).send("Category must be a string.");
    }
  }
});

router.get('/products/:id', (req,res) => {
    const id = req.params.id;
    const idx = products.findIndex((product) => product.id === id);
    if(idx != -1){
        res.status(200).send(products[idx]);
    }else{
        res.status(404).send("Index not found");
    }
})
module.exports = router;