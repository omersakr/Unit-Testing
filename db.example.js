// Example: MongoDB Connection Setup
// This file demonstrates how to use the provided MongoDB connection string

const { MongoClient } = require('mongodb');

// MongoDB Connection String
const MONGODB_URI = 'mongodb+srv://omersaqr2001_db_user:BDjPJ8L23CMHWUWz@cluster0.esi99uo.mongodb.net/?appName=Cluster0';

// Database name
const DB_NAME = 'testdb';

// Create MongoDB client
const client = new MongoClient(MONGODB_URI);

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');
    
    const db = client.db(DB_NAME);
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Example: Insert data
async function insertUser(userData) {
  const db = await connectDB();
  const usersCollection = db.collection('users');
  
  const result = await usersCollection.insertOne(userData);
  console.log('User inserted:', result.insertedId);
  
  return result;
}

// Example: Find data
async function findUsers() {
  const db = await connectDB();
  const usersCollection = db.collection('users');
  
  const users = await usersCollection.find({}).toArray();
  console.log('Users found:', users.length);
  
  return users;
}

// Example: Update data
async function updateUser(userId, updateData) {
  const db = await connectDB();
  const usersCollection = db.collection('users');
  
  const result = await usersCollection.updateOne(
    { _id: userId },
    { $set: updateData }
  );
  
  console.log('User updated:', result.modifiedCount);
  return result;
}

// Example: Delete data
async function deleteUser(userId) {
  const db = await connectDB();
  const usersCollection = db.collection('users');
  
  const result = await usersCollection.deleteOne({ _id: userId });
  console.log('User deleted:', result.deletedCount);
  
  return result;
}

// Close connection
async function closeConnection() {
  await client.close();
  console.log('MongoDB connection closed');
}

// Example usage
async function main() {
  try {
    // Insert a user
    await insertUser({
      name: 'Ahmed Ali',
      email: 'ahmed@example.com',
      age: 25
    });
    
    // Find all users
    const users = await findUsers();
    console.log('All users:', users);
    
    // Close connection
    await closeConnection();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Uncomment to run the example
// main();

module.exports = {
  connectDB,
  insertUser,
  findUsers,
  updateUser,
  deleteUser,
  closeConnection
};
