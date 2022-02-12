const express = require("express");
const router = express.Router();
const movie = require("../controllers").movie;

router.get("/", movie.getAll);
router.get("/:id", movie.getMovie);
router.post("/", movie.addMovie);
router.patch("/:id", movie.updateMovie);
router.delete("/:id", movie.deleteMovie);

module.exports = router;
