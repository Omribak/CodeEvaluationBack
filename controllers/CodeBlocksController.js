const CodeBlock = require("../models/CodeBlockModel");

exports.getCodeBlocks = async (req, res) => {
  try {
    const codeblocks = await CodeBlock.find();
    res.status(200).json({
      message: "success",
      results: codeblocks.length,
      codeblocks,
    });
  } catch (error) {
    res.status(404).json({
      message: "Couldn't load the Code Blocks , please try again.",
      error,
    });
  }
};

exports.getCodeBlockById = async (req, res) => {
  try {
    const codeblock = await CodeBlock.findById(req.params.blockId);
    res.status(200).json({
      message: "success",
      codeblock,
    });
  } catch (error) {
    res.status(404).json({
      message: "Couldn't load the Code Block , please try again.",
      error,
    });
  }
};
