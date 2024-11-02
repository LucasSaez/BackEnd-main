import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validateCampos.js";
import { createUser, getAllUsers, getUserById, updateUserById } from "../controllers/user.controller";

const router = Router();

//endpoint para obtener todos los usuarios
router.get('/', getAllUsers);

//endpoint para obtener un usuario por su ID
router.get('/user/:id', getUserById);

//endpoint para crear un usuario
router.post('/', createUser);

//endpoint para eliminar un usuario por su ID
router.put('/:id', updateUserById);

//endpoint para eliminar un usuario por su ID
router.delete('/:id');


export default router