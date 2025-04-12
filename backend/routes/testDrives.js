const express = require('express');
const router = express.Router();
const TestDrive = require('../models/TestDrive');

// Get all test drives
router.get('/', async (req, res) => {
  try {
    const testDrives = await TestDrive.find();
    res.json(testDrives);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching test drives" });
  }
});

// Book a test drive
router.post('/', async (req, res) => {
  const { userName, userEmail, userPhone, date, timeSlot, status } = req.body;
  try {
    const newTestDrive = new TestDrive({ userName, userEmail, userPhone, date, timeSlot, status });
    await newTestDrive.save();
    res.status(201).json(newTestDrive);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error booking test drive" });
  }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const testDrive = await TestDrive.findById(id);
      if (!testDrive) {
        return res.status(404).json({ message: 'Test drive not found' });
      }
  
      // Update status if valid
      if (status && ['pending', 'completed'].includes(status)) {
        testDrive.status = status;
        await testDrive.save();
        return res.status(200).json({ message: 'Test drive status updated', testDrive });
      } else {
        return res.status(400).json({ message: 'Invalid status' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating test drive status' });
    }
  });

module.exports = router;
