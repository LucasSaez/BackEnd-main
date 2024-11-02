import { validationResult } from "express-validator";
//middleware para verificar que cada Textfield no venga vacio
export const validarCampos = (req,res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            msg: errors
        })
    }


    next();


}