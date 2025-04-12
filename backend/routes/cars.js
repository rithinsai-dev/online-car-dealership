const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cars" });
  }
});

// Get car by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Get the car ID from the URL

  try {
    const car = await Car.findById(id); // Fetch the car using its ID

    if (!car) {
      return res.status(404).json({ message: "Car not found" }); // If no car found
    }

    res.status(200).json(car); // Return the car details
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching car details" });
  }
});

// Add a new car
router.post('/', async (req, res) => {
  const { make, model, year, price, mileage, fuelType, transmission, features, images, availability } = req.body;

  try {
    const newCar = new Car({ make, model, year, price, mileage, fuelType, transmission, features, images, availability });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding car" });
  }
});

// Update car details
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { make, model, year, price, mileage, fuelType, transmission, features, images, availability } = req.body;

  try {
    const car = await Car.findById(id); // Find the car by ID

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Update car fields based on the request body
    car.make = make || car.make;
    car.model = model || car.model;
    car.year = year || car.year;
    car.price = price || car.price;
    car.mileage = mileage || car.mileage;
    car.fuelType = fuelType || car.fuelType;
    car.transmission = transmission || car.transmission;
    car.features = features || car.features;
    car.images = images || car.images;
    car.availability = availability !== undefined ? availability : car.availability;

    await car.save(); // Save the updated car
    res.status(200).json({ message: "Car updated successfully", car });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating car" });
  }
});

// Delete a car
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Get car ID from the URL parameters

  try {
    const car = await Car.findByIdAndDelete(id); // Delete the car from the database

    if (!car) {
      return res.status(404).json({ message: "Car not found" }); // If the car doesn't exist
    }

    res.status(200).json({ message: "Car deleted successfully" }); // Success response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting car" }); // Error response
  }
});

module.exports = router;
