"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { getUsers, addUser } = require("./handlers");

const PORT = process.env.PORT || 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/account/login", getUsers)
  .post("/account/signup", addUser)

  // .post("/exercise-2/greeting", createGreeting)
  // .get("/exercise-2/greeting/:_id", getGreeting)
  // .get("/exercise-2/greeting", getGreetings)
  // .put("/exercise-2/greeting/:_id", updateGreeting)
  // .delete("/exercise-2/greeting/:_id", deleteGreeting)

  // .get("/*", (req, res) => res.status(404).type("txt").send("Nope"))

  // handle 404s
  // .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
