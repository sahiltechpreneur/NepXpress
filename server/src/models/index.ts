import sequelize from '../config/database';
import User from './User';
import Courier from './Courier';

// Associations
User.hasMany(Courier, {
  foreignKey: 'userId',
});

Courier.belongsTo(User, {
  foreignKey: 'userId',
});

export { sequelize, User, Courier };
