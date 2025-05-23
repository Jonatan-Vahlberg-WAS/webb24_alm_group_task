const User = require('./User');
const Accommodation = require('./Accommodation');

// Definiera associationer här för att undvika cirkulära beroenden
User.hasMany(Accommodation, { foreignKey: 'userId' });
Accommodation.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Accommodation
}; 