const db = require("../config/db");
const sequelize = require("sequelize");
const CrewMember = require("./CrewMember");

const Movie = db.define("movie", {
  title: {
    type: sequelize.STRING,
    allownull: false,
    validate: {
      len: [3, 200]
    }
  },
  category: {
    type: sequelize.ENUM('actiune', 'drama', 'comedie'),
    allownull: false,
  },
  date: {
    type: sequelize.DATEONLY,
    allownull: false,
  }
});

Movie.hasMany(CrewMember);
CrewMember.belongsTo(Movie);

module.exports = Movie;
