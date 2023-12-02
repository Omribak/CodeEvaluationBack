const express = require("express");
const app = express();
const CodeBlocksRoutes = require("./routes/CodeBlocksRoutes");
const cors = require("cors");

app.use(cors());

app.use("/api/code-blocks", CodeBlocksRoutes);

module.exports = app;
