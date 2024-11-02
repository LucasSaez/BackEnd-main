import { Router } from "express";
import { sendChatMessage, getPreviousMessages } from '../controllers/chat.controller.js';


import { verifyToken } from "../middlewares/auth.middlewares.js"; // Middleware para verificar el token

const router = Router();

// Ruta para enviar un mensaje
router.post('/send', verifyToken, sendChatMessage);

// Ruta para obtener todos los mensajes
router.get('/messages', verifyToken, getPreviousMessages);

export default router;
