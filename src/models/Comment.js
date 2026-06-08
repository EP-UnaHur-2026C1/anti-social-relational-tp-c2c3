import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  visible: {
    type: DataTypes.VIRTUAL,
    get() {
      
      const createdAt = this.getDataValue('createdAt');
      
      if (!createdAt) return true; 

      const maxMonths = parseInt(process.env.COMMENT_MAX_AGE_MONTHS) || 6;
      
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - maxMonths);

  
      return createdAt >= cutoffDate;
    }
  }
},{
  updatedAt: false // Mantenemos solo el createdAt
});

export default Comment;