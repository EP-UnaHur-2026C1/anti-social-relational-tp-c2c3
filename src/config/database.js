import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Inicializamos Sequelize con la URL de nuestra base de datos en Docker.
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Logging se puede cambiar a true si queremos ver las consultas en la consola.
});

export default sequelize;