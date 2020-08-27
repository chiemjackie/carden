const { MongoClient } = require("mongodb");
const { request } = require("express");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    const input = req.body;

    await client.connect();

    const db = client.db("carden");
    console.log("connected!");

    await db.collection("users").insertOne(input);

    client.close();
    console.log("disconnected!");

    res.status(201).json({
      status: 201,
      data: {
        _id: input._id,
        fname: input.fname,
        lname: input.lname,
        email: input.email,
        username: input.username,
        password: input.password,
      },
    });
  } catch ({ message }) {
    res.status(401).json({ status: 401, message: message });
  }
};

const getUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("carden");
  console.log("connected!");

  const data = await db
    .collection("users")
    .find({ username: `${req.body.username}` })
    .toArray();
  console.log(data[0]);

  client.close();
  console.log("disconnected!");

  if (data.length > 0) {
    res.status(200).json({ status: 200, data });
  } else {
    res
      .status(404)
      .json({ status: 404, message: "Incorrect username or password" });
  }
};

module.exports = { addUser, getUser };
