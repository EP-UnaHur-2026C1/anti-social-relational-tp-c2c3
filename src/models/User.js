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
   updatedAt: false // Si no se quiere el atributo updatedAt, se deshabilita con false.
});

export default User;