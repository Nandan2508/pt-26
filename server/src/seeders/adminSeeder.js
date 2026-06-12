const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: '../../.env' }); // Adjust if .env is elsewhere

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/thapar_placement');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@thapar.edu';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    const adminUser = new User({
      name: 'System Admin',
      email: adminEmail,
      password: 'admin123',
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Seeder Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
