import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PostImage = sequelize.define('PostImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // No necesitamos timestamps para las imágenes del MVP
  timestamps: false,
  tableName: 'Post_Images' // Forzamos el nombre de la tabla como en el DER
});

export default PostImage;