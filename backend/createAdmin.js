require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Admin user details
        const adminData = {
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin',
        };

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('Email:', adminData.email);
            console.log('You can login with this account.');
            process.exit(0);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminData.password, salt);

        // Create admin user
        const admin = new User({
            username: adminData.username,
            email: adminData.email,
            password: hashedPassword,
            role: 'admin',
        });

        await admin.save();

        console.log('✅ Admin user created successfully!');
        console.log('');
        console.log('📧 Email:', adminData.email);
        console.log('🔑 Password:', adminData.password);
        console.log('');
        console.log('⚠️  IMPORTANT: Change this password after first login!');
        console.log('');
        console.log('You can now login with these credentials.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
        process.exit(1);
    }
};

createAdminUser();
