const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const TestDrive = require('./models/TestDrive'); // Correct import
const Purchase = require('./models/Purchase');

// Sample test drive and purchase data (without _id field)
const sampleTestDrives = [
  {
    userName: "Alice Johnson",
    userEmail: "alice@example.com",
    userPhone: "1234567890",
    date: "2025-04-15",
    timeSlot: "10:00 AM - 11:00 AM",
    status: "pending"
  },
  {
    userName: "Bob Smith",
    userEmail: "bob@example.com",
    userPhone: "9876543210",
    date: "2025-04-16",
    timeSlot: "2:00 PM - 3:00 PM",
    status: "completed"
  }
];

const samplePurchases = [
  {
    userName: "Charlie Green",
    userEmail: "charlie@example.com",
    userPhone: "1122334455",
    purchaseDate: "2025-04-10",
    paymentMethod: "Credit Card",
    status: "paid"
  },
  {
    userName: "Diana Blue",
    userEmail: "diana@example.com",
    userPhone: "5566778899",
    purchaseDate: "2025-04-11",
    paymentMethod: "Bank Transfer",
    status: "shipped"
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB...');

  try {
    // Clean up existing data
    await TestDrive.deleteMany({});
    await Purchase.deleteMany({});

    // Insert new data (without _id)
    await TestDrive.insertMany(sampleTestDrives);
    await Purchase.insertMany(samplePurchases);

    console.log("✅ Test drive and purchase data seeded!");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    mongoose.connection.close();
  }
});
