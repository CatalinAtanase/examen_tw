const CrewMember = require("../models").CrewMember;

const controller = {
  getAll: async (req, res) => {
    try {
      const crewMembers = await CrewMember.findAll();
      return res.status(200).json({crewMembers});
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getCrewMember: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const crewMember = await CrewMember.findByPk(id);
      if (!crewMember) {
        return res.sendStatus(404);
      }
      return res.status(200).json(crewMember);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getCrewMemberByMovie: async (req, res) => {
    try {
      const movieId = parseInt(req.params.movieId);
      const offset = parseInt(req.params.offset);
      const crewMember = await CrewMember.findAndCountAll({
        where: {
          movieId: movieId,
        },
        limit: 1,
        offset,
      });
      if (!crewMember) {
        return res.sendStatus(404);
      }
      return res.status(200).json(crewMember);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  addCrewMember: async (req, res) => {
    try {
      const { name, role, movieId } = req.body;
      if (!name || !role || !movieId) {
        return res.sendStatus(400);
      }

      if(!CrewMember.rawAttributes.role.values.includes(role)) {
        return res.sendStatus(400);
      }

      crewMember = await CrewMember.create({
        name,
        role,
        movieId,
      });

      return res.status(201).json({ message: "CrewMember created!", crewMember });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  updateCrewMember: async (req, res) => {
    try {
      const { name, role, movieId } = req.body;
      const id = parseInt(req.params.id);
      let crewMember = await CrewMember.findByPk(id);

      if (!crewMember) {
        return res.sendStatus(404);
      }

      if(!CrewMember.rawAttributes.role.values.includes(role)) {
        return res.sendStatus(400);
      }

      crewMember.name = name;
      crewMember.role = role;
      crewMember.movieId = movieId;
      await crewMember.save();

      return res
        .status(200)
        .json({ message: "CrewMember updated!", crewMember });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  deleteCrewMember: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const crewMember = await CrewMember.findByPk(id);
      if (!crewMember) {
        return res.sendStatus(404);
      }
      await crewMember.destroy();
      res.statusCode = 200;
      return res.json({ message: "CrewMember deleted!" });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
};

module.exports = controller;
