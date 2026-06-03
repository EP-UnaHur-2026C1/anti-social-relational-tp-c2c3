import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  // Sequelize añade createdAt automáticamente. Desactivamos updatedAt.
  updatedAt: false 
});

export default Post;