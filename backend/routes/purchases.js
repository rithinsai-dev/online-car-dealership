const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// Get all purchases
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching purchases" });
  }
});

// Process a purchase
router.post('/', async (req, res) => {
  const { userName, userEmail, userPhone, purchaseDate, paymentMethod, status } = req.body;
  try {
    const newPurchase = new Purchase({ userName, userEmail, userPhone, purchaseDate, paymentMethod, status });
    await newPurchase.save();
    res.status(201).json(newPurchase);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing purchase" });
  }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Get purchase ID from URL
    const { status } = req.body; // Get status from request body (either 'paid' or 'shipped')
  
    try {
      const purchase = await Purchase.findById(id); // Find the purchase by ID
  
      if (!purchase) {
        return res.status(404).json({ message: 'Purchase not found' });
      }
  
      // Update the purchase status if it exists
      purchase.status = status || purchase.status;
  
      await purchase.save(); // Save the updated purchase
  
      res.status(200).json({ message: 'Purchase status updated successfully', purchase });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating purchase status' });
    }
  });
module.exports = router;
