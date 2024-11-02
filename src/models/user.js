import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

//este fichero crea y modela la tabla que vamos a guardar en la base de datos
//de esta manera ya sabemos que es lo que va a guardar el usuario
//dandole asi tambien caracteristicas especiales como: que sea unico valor como en el email
//le damos el tipo de dato, si es un numero entero y/o una cadena de texto


class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    age: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
   },
    {
        sequelize,
        //aca le colocamos como se va a llamar nuestro modelo.
        modelName: 'User'
    });
      
//aca sincronizamos este modelo con nuestra base de datos, y lo crea automaticamente, sin necesidad que lo creemos a mano.
User.sync()
//al ser una promesa usamos el metodo then y .catch para capturar un error en caso que no se sincronicen los cambios
    .then(() => {
        //console.log('La tabla de usuarios ha sido creada');
    })
    .catch((error) => {
        console.error('Error al crear la tabla de usuarios: ', error);
    });

export default User;