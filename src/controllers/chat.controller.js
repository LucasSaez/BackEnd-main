import Message from '../models/message.js';

// Manejador para crear un nuevo mensaje de chat
export const sendChatMessage = async (socket, msg) => {
    const username = socket.handshake.auth.username || 'anonymous';
    
    try {
        // Guardar el mensaje en la base de datos
        const newMessage = await Message.create({
            content: msg,
            user: username
        });

        // Emitir el mensaje a todos los usuarios conectados, incluyendo al remitente
        socket.broadcast.emit('chat message', {
            id: newMessage.id,
            content: msg,
            user: username
        });

        // Emitir el mensaje al propio remitente para confirmar el envío
        socket.emit('chat message', {
            id: newMessage.id,
            content: msg,
            user: username
        });
    } catch (error) {
        console.error('Error al guardar el mensaje:', error);
    }
};

// Manejador para obtener mensajes previos
export const getPreviousMessages = async (socket) => {
    try {
        const messages = await Message.findAll(); // Obtén todos los mensajes
        // Enviar todos los mensajes almacenados en una sola emisión
        socket.emit('previous messages', messages);
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }
};
