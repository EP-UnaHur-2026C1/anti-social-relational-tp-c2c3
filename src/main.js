import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express'; 
import YAML from 'yamljs';
import sequelize from './config/database.js';
import './models/index.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerDocument = YAML.load('./swagger.yaml');
// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
// Ruta de prueba
app.get('/api/ping', (req, res) => {
  res.json({ message: 'El servidor está funcionando' });
});

// Función para conectar a la DB y arrancar el servidor
const startServer = async () => {
  try {
    // Autenticamos la conexión con Docker
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');

    await sequelize.sync({ force: false });
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

startServer();