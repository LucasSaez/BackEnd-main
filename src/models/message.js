import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/config.js';
import User from './user.js'; // Asegúrate de importar el modelo de usuario si tienes uno

class Message extends Model {}

Message.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Relación con la tabla de usuarios
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages', // Esto asegura que el nombre de la tabla sea en plural
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
});

Message.sync()
.then(() => {
    console.log('La tabla de mensajes ha sido creada');
})
.catch((error) => {
    console.error('Error al crear la tabla de mensajes: ', error);
});

export default Message;
