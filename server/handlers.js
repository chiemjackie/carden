const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createUser = async () => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("carden");
  console.log("connected!");

  await db.collection("users").insertMany([
    {
      fname: "test",
      lname: "test",
      email: "test@test.com",
      username: "test",
      password: "test",
    },
    {
      fname: "test2",
      lname: "test2",
      email: "test2@test.com",
      username: "test2",
      password: "test2",
    },
  ]);

  client.close();
  console.log("disconnected!");
};

const getUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("carden");
  console.log("connected!");

  const data = await db
    .collection("users")
    .find({ username: "test", password: "test" })
    .toArray();
  console.log(data[0]);
  console.log(data.length);

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

getUser();

module.exports = { createUser, getUser };
