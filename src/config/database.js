import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Inicializamos Sequelize con la URL de nuestra base de datos en Docker
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Cambia a true si quieres ver las consultas SQL en la consola
});

export default sequelize;