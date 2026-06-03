import { Sequelize } from 'sequelize';

// Inicializamos Sequelize indicando que usaremos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './unahur_db.sqlite',
  // Opcional: Puedes poner 'false' para que no ensucie la consola mostrando cada consulta SQL
  logging: false 
});

export default sequelize;