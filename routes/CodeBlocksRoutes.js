const express = require("express");
const router = express.Router();
const CodeBlocksController = require("../controllers/CodeBlocksController");

router.route("/").get(CodeBlocksController.getCodeBlocks);
router.route("/:blockId").get(CodeBlocksController.getCodeBlockById);

module.exports = router;
