import AppServer from './src/server.js';
import dotenv  from 'dotenv';




dotenv.config(); //habilita las variables de entorno


//aca creamos la instancia del objeto server, y poder asi iniciar el servidor de manera correcta.

const server = new AppServer();