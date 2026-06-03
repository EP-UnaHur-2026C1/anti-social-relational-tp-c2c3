import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  nickName: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    unique: true,
    allowNull: false
  }
}, {
  // Sequelize crea automáticamente createdAt y updatedAt
  // Si no quieres el updatedAt, lo deshabilitamos así:
 // updatedAt: false 
});

export default User;