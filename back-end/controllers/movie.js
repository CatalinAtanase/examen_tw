const Movie = require("../models/Movie");
const CrewMember = require("../models/CrewMember");

const controller = {
  getAll: async (req, res) => {
    try {
      const movies = await Movie.findAll();
      return res.status(200).json({ movies });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getMovie: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const movie = await Movie.findOne(
       {
         where: {
           id
         },
         include: [CrewMember]
       }
      );
      if (!movie) {
        return res.sendStatus(404);
      }
      return res.status(200).json(movie);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  addMovie: async (req, res) => {
    try {
      const { title, category, date } = req.body;
      if (!title || !category || !date) {
        return res.sendStatus(400);
      }

      if(!Movie.rawAttributes.category.values.includes(category)) {
        return res.sendStatus(400);
      }

      const movie = await Movie.create({
        title,
        category,
        date,
      });

      return res
        .status(201)
        .json({ message: "Movie created!", movie });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  updateMovie: async (req, res) => {
    try {
      const { title, category, date } = req.body;
      if (!title || !category || !date) {
        return res.sendStatus(400);
      }

      if(!Movie.rawAttributes.category.values.includes(category)) {
        return res.sendStatus(400);
      }

      const id = parseInt(req.params.id);
      let movie = await Movie.findByPk(id);
      if (!movie) {
        return res.sendStatus(404);
      }
      movie.title = title;
      movie.category = category;
      movie.date = date;
      await movie.save();

      return res
        .status(200)
        .json({ message: "Movie updated succesfully!", movie });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const movie = await Movie.findByPk(id);
      if (!movie) {
        return res.sendStatus(404);
      }
      await movie.destroy();
      res.statusCode = 200;
      return res.json({ message: "Account deleted!" });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
};

module.exports = controller;
