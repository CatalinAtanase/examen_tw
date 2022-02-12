const express = require("express");
const router = express.Router();
const crewMemberRouter = require("./crewMember");
const dbRouter = require("./db");
const movie = require("./movie");

router.use("/crew", crewMemberRouter);
router.use("/movie", movie);
router.use("/", dbRouter);

module.exports = router;
