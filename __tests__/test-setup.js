process.env.NODE_ENV = "test";
const sequelize = require("../src/config/database");
// const Accommodation = require("../src/models/Accommodation"); 
const User = require("../src/models/User");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await User.destroy({ where: {} });
  // await Accommodation.destroy({ where: {} });
});

afterAll(async () => {
  await sequelize.close();
});

module.exports = { sequelize, User };
