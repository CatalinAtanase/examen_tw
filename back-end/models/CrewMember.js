const db = require("../config/db");
const sequelize = require("sequelize");

const CrewMember = db.define(
  "crew_member",
  {
    name: {
      type: sequelize.STRING,
      validate: {
        len: [5, 200],
      },
      allownull: false,
    },
    role: {
      type: sequelize.ENUM('Director', 'Writer', 'Cascador'),
      allownull: false,
    },
  },
);

module.exports = CrewMember
