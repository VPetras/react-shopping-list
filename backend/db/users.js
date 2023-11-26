const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

const config = require("../config.json");
dotenv.config((path = "../.env"));

let mongoUrl = "mongodb://localhost:27017";
let mongoDbName = "ShoppingList";
let mongoCollectionName = "Users";

if (config.production) {
  mongoUrl = process.env.MONGO_PROD_URI;
  mongoDbName = process.env.MONGO_PROD_DB;
  mongoCollectionName = process.env.MONGO_PROD_USERS_COLLECTION;
} else {
  mongoUrl = process.env.MONGO_DEV_URI;
  mongoDbName = process.env.MONGO_DEV_DB;
  mongoCollectionName = process.env.MONGO_DEV_USERS_COLLECTION;
}

const client = new MongoClient(mongoUrl);

const db = client.db(mongoDbName);
const collection = db.collection(mongoCollectionName);

async function getUserByEmail(email) {
  try {
    await client.connect();
    const result = await collection.findOne({ email: email });
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function createUser(user) {
  try {
    await client.connect();
    const result = await collection.insertOne(user);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

module.exports = { getUserByEmail, createUser };
