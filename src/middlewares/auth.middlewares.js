// src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtiene el token

    if (!token) {
        return res.status(403).json({ msg: 'Token requerido' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta', (err, user) => {
        if (err) {
            return res.status(403).json({ msg: 'Token inválido' });
        }
        req.user = user; // Almacena el usuario decodificado en la solicitud
        next(); // Continúa con la siguiente función de middleware
    });
};
