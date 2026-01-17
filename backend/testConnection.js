require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Found (hidden for security)' : 'NOT FOUND!');

if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in .env file!');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully!');
        console.log('Connection details:');
        console.log('- Database:', mongoose.connection.db.databaseName);
        console.log('- Host:', mongoose.connection.host);
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed!');
        console.error('Error:', err.message);
        console.error('\nCommon issues:');
        console.error('1. Check if MongoDB is running');
        console.error('2. Verify the connection string format');
        console.error('3. Check network/firewall settings');
        console.error('4. For MongoDB Atlas, check IP whitelist');
        process.exit(1);
    });
