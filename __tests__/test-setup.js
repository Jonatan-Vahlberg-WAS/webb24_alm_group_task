process.env.NODE_ENV = "test";
const sequelize = require("../src/config/database");
const Accommodation = require("../src/models/Accommodation"); 
const User = require("../src/models/User");

User.associate({ Accommodation });
Accommodation.associate({ User });


beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

module.exports = { sequelize, User, Accommodation };
