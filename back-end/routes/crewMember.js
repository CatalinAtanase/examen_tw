const express = require("express");
const router = express.Router();
const crewMember = require("../controllers").crewMember;

router.get("/", crewMember.getAll);
router.get("/byMovie/:movieId/:offset/", crewMember.getCrewMemberByMovie);
router.get("/:id/", crewMember.getCrewMember);
router.post("/", crewMember.addCrewMember);
router.patch("/:id/", crewMember.updateCrewMember);
router.delete("/:id/", crewMember.deleteCrewMember);

module.exports = router;
