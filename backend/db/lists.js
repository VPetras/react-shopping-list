const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const mongoUrl = process.env.MONGO_URI;
const mongoDbName = process.env.MONGO_DB;
const mongoCollectionName = process.env.MONGO_LISTS_COLLECTION;

const client = new MongoClient(mongoUrl);

const db = client.db(mongoDbName);
const collection = db.collection(mongoCollectionName);

async function getActiveLists(userId) {
  try {
    await client.connect();
    const result = await collection
      .find({ owner_id: userId, archived: false })
      .toArray();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function getArchivedLists(userId) {
  try {
    await client.connect();
    const result = await collection
      .find({ owner_id: userId, archived: true })
      .toArray();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function getSharedLists(userId) {
  try {
    await client.connect();
    const result = await collection
      .find({ shared_users: { $elemMatch: { id: userId } } })
      .toArray();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function getList(listId) {
  try {
    await client.connect();
    const result = await collection.findOne({ _id: new ObjectId(listId) });
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function deleteList(listId) {
  try {
    await client.connect();
    const result = await collection.deleteOne({ _id: new ObjectId(listId) });
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function updateList(list_id, updateData) {
  try {
    await client.connect();
    const result = await collection.updateOne(
      { _id: new ObjectId(list_id) },
      updateData
    );
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function createList(list) {
  try {
    await client.connect();
    const result = await collection.insertOne(list);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

module.exports = {
  createList,
  updateList,
  getActiveLists,
  getArchivedLists,
  getSharedLists,
  deleteList,
  getList,
};
