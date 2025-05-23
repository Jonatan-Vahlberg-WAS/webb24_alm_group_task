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
    unique: true,  
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    vaildate: {
      isEmail: true,
    }
  },
  profilePic: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    }
  },
    timestamps: true,
  
});

User.associate = (models) => {
  User.hasMany(models.Accomodation, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
};

module.exports = User;
