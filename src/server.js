import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import LoginRoutes from './routes/login.routes.js';
import sequelize from './db/config.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import User from './models/user.js';
import Message from './models/message.js';
import chatRoutes from './routes/chat.routes.js';

dotenv.config(); // Cargar variables de entorno

class AppServer {
    constructor() {
        this.app = express();
        this.middlewares();
        this.connectionDb();
        this.socketInit();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use('/api', LoginRoutes);
        this.app.use('/api/chat', chatRoutes); // Corrección: usar `this.app.use`
    }

    connectionDb() {
        sequelize.authenticate()
            .then(() => {
                console.log('Conectado a la base de datos');
            })
            .catch((error) => {
                console.log('Error al conectar con la BD', error);
            });
    }

    socketInit() {
        const httpServer = createServer(this.app);
        
        // Configura Socket.io con WebSocket como transporte preferido
        const io = new Server(httpServer)
    

    
        io.on('connection', (socket) => {
            console.log('Un nuevo usuario se ha conectado');
            
            socket.on('chat message', (msg) => {
                io.emit('chat message', msg); // Emitir el mensaje a todos los clientes conectados
            });
            
            socket.on('disconnect', () => {
                console.log('Un usuario se ha desconectado');
            });
        });
        
        // Cambia el puerto aquí si es necesario
        httpServer.listen(3000, () => {
            console.log('Servidor corriendo en puerto 3000');
        });
    }
    
}

export default AppServer;
