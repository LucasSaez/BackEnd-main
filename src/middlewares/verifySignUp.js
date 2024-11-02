import User from '../models/user.js';
//funcion que comprueba que si el email ingresado a la hora de registrarse, ya no este creado y almacenado en la base de datos. De esta manera nos aseguramos que no hayan dos emails identicos guardados.
export const verifySignUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    //buscamos en la base de datos comparando si el mail ingresado coincide con el que esta almacenado
    const existingUser = await User.findOne({ where: { email } });
    //si existe el mail,lance un error diciendo que el correo ya esta registrado
    if (existingUser) {
      return res.status(401).json({ msg: 'El correo electrónico ya está registrado.' });
    }
    
    next();
  } catch (error) {
    //aca capturamos algun error externo para verificar si algo anda mal
    //console.error('Error en el middleware verifySignUp:', error);
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
}; 
