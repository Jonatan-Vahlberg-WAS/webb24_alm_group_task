const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Accommodation = sequelize.define("Accommodation", {
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rent: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    room: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        }
    }
});

Accommodation.associate = (models) => {
    Accommodation.belongsTo(models.Accommodation, {
        foreignKey: "userId",
        onDelete: "CASCADE",
    });
};

module.exports = Accommodation;
