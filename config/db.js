// connection.js

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

async function connectToMongoDB() {
  try {
    const mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();
    await mongoose.connect(mongoUri);
  } catch (error) {
    throw error;
  }
}

module.exports = connectToMongoDB();
