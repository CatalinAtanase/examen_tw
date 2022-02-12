const crewMember = require("./crewMember");
const movie = require("./movie");
const dbController = require("./db");

const controllers = {
  crewMember: crewMember,
  db: dbController,
  movie: movie,
};

module.exports = controllers;
