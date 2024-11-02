import { Router } from "express";
import { loginUser, createUser, getAllUsers } from "../controllers/user.controller.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validateCampos.js";
import { loginAuthentication } from "../middlewares/loginAuthentication.js";
import { verifySignUp } from "../middlewares/verifySignUp.js";

const router = Router();

// Ruta para obtener todos los usuarios en la base de datos
router.get('/users', getAllUsers);

// Ruta para que el usuario pueda registrarse
router.post('/register', [
    check('name', 'El nombre debe contener al menos 3 caracteres').isLength({ min: 3 }),
    check('lastname', 'El apellido debe contener al menos 3 caracteres').isLength({ min: 3 }),
    check('age', 'Revise el campo edad').isInt({ min: 1, max: 120 }), // Cambié a isInt para validar edad
    check('email', 'Revise el correo electrónico').isEmail(),
    check('password', 'La contraseña requiere como mínimo 8 caracteres').isLength({ min: 8 }),
    validarCampos,
    verifySignUp,
], createUser);

// Petición POST login verificación credenciales
router.post('/login', [
    check('email', 'El correo electrónico es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos,
    loginAuthentication, // Middleware para verificar credenciales
], loginUser); // Llama directamente a loginUser

export default router;
