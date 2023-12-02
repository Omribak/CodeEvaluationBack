const fs = require("fs");
const CodeBlock = require("../models/CodeBlockModel");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "../config.env" });

// This is a script for loading the data to the DB

const codeblocks = JSON.parse(
  fs.readFileSync(`${__dirname}/code-blocks.json`, "utf-8")
);

// Connecting to DB

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Connection Sucessful!");
  });

// Import the DATA

const importCodeBlocks = async () => {
  try {
    await CodeBlock.create(codeblocks);
    console.log("Code Blocks sucessfuly loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete the DATA

const deleteCodeBlocks = async () => {
  try {
    await CodeBlock.deleteMany();
    console.log("Code Blocks sucessfuly deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Scripts for the Data

if (process.argv[2] === "--importCodeBlocks") {
  importCodeBlocks();
} else if (process.argv[2] === "--deleteCodeBlocks") {
  deleteCodeBlocks();
}
