const User = require("./User");
const Accommodation = require("./Accommodation");


// Accommodation.associate({ User });
// User.associate({ Accommodation });

// User.js
User.hasMany(Accommodation, { foreignKey: 'userId' });

// Accommodation.js
Accommodation.belongsTo(User, { foreignKey: 'userId' });
