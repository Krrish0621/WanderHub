const express = require("express");
const router = express.Router();

const aiController = require("../controllers/ai.js");

router.post("/generate-description", aiController.generateDescription);

router.post("/chat", aiController.chatbot);

module.exports = router;
