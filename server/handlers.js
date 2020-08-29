const { MongoClient } = require("mongodb");
const { request } = require("express");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const input = req.body;

  await client.connect();

  const db = client.db("carden");
  console.log("connected!");

  await db.collection("users").insertOne(input);

  client.close();
  console.log("disconnected!");
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("carden");
  console.log("connected!");

  const data = await db.collection("users").find().toArray();

  client.close();
  console.log("disconnected!");

  if (data.length > 0) {
    res.status(200).json({ status: 200, data });
  } else {
    res.status(404).json({ status: 404, message: "Data MIA" });
  }
};

module.exports = { addUser, getUsers };
