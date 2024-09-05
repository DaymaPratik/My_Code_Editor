const express = require('express');
const { getTestinomialsFunction, addTestinomialFunction } = require("../Controller/testinomialController")
const router = express.Router();
router.get("/api/getTestinomials", getTestinomialsFunction);
router.post("/api/addTestinomial", addTestinomialFunction);
module.exports = router;
