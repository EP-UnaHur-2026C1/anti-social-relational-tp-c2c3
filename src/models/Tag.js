import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true // Evita etiquetas duplicadas en la base de datos
  }
}, {
  timestamps: false // Los tags solo son un diccionario, no necesitan fechas
});

export default Tag;