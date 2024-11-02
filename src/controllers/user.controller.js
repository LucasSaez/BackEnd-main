import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Método para traer los usuarios en lista 
export const getAllUsers = async (req, res) => {
    try {
        // Busca en la base de datos todos los usuarios que estén almacenados
        const users = await User.findAll();
        res.status(200).json({
            users,
            ok: true
        });
    } catch (error) {
        // Captura un error y lo muestra por consola.
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los usuarios',
        });
    }
};

// Método para iniciar sesión de usuario, generando un token
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca el usuario por el correo electrónico
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Verifica la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        // Genera un token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'tu_clave_secreta', { expiresIn: '1h' });

        res.status(200).json({
            msg: 'logueado con éxito',
            token // Envía el token en la respuesta
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Método para crear un usuario
export const createUser = async (req, res) => {
    const { name, lastname, age, password, email } = req.body;

    try {
        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);
        const nuevoUsuario = {
            name,
            lastname,
            age,
            password: hashPassword,
            email
        };

        const user = await User.create(nuevoUsuario);
        res.status(201).json({
            msg: 'Usuario creado correctamente',
            user // Envía el usuario creado en la respuesta
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear el usuario' });
    }
};
