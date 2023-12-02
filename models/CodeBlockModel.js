const mongoose = require("mongoose");

const CodeBlockSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A Code Block must have a name."],
  },
  code: String,
});

const CodeBlock = mongoose.model("CodeBlock", CodeBlockSchema);

module.exports = CodeBlock;
