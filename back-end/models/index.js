const CrewMember = require("./CrewMember");
const Movie = require("./Movie");

Movie.hasMany(CrewMember, { onDelete: 'CASCADE', hooks: true });
CrewMember.belongsTo(Movie);

module.exports = {
  CrewMember: CrewMember,
  Movie: Movie,
};
