//verificacion de credenciales e informacion valida.


import bcrypt from 'bcryptjs';
import User from '../models/user.js';
export const loginAuthentication = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ 
            where: {email: email } //compara mail dado con mails guardados
        });

        if (!user) {  //de no encontrarlo 
            return res.status(401).json({ msg: 'El Email o Contraseña es incorrecto.' });
        }
        //console.log('Contraseña hash en DB:', user.password); //testing
        //console.log('Contraseña en plano:', password); //testing
        const isPasswordValid = await bcrypt.compare(password, user.password);  //compara contraseña de texto plano con el hash guardado en el usuario.

        if (!isPasswordValid) { // ⤵⤵ si "isPasswordValid" es NO valida (!) 
            return res.status(401).json({ msg: 'El Email o Contraseña es incorrecto.' }); 
        }
        //si esta todo ok, "next" salta al sgte middleware.
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
