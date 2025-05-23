const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Användarnamnet måste vara unikt"
    },
    validate: {
      notEmpty: {
        msg: "Användarnamn får inte vara tomt"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Epost addressen måste vara unik"
    },
    validate: {
      isEmail: {
        msg: "Ogiltigt epost format"
      },
      notEmpty: {
        msg: "Epost adress krävs"
      }
    }
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: {
        msg: "Profilbilden måste vara en giltig URL"
      }
    }
  }
}, {
  timestamps: true,
  tableName: "users"
});

module.exports = User;
