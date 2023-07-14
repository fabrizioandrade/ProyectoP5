const express = require("express");
const { createUser,loginUser,logOut } = require("../controllers/users");
const validateUser = require("../middlewares/auth");
const Joi=require('joi')
const userRouter=express.Router()


const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  code: Joi.string().allow(""),
});

userRouter.post('/register',(req, res, next) => {
  // Valida los datos del registro usando el esquema
  const { error } = registerSchema.validate(req.body);
  if (error) {
    // Si hay un error de validación, devuelve una respuesta de error
    return res.status(400).send({ success: false, message: error.details[0].message });
  }
  // Si los datos son válidos, llama a la función createUser
  next();
},createUser)
userRouter.post('/login',loginUser)
userRouter.post('/logout',logOut)
userRouter.get("/me", validateUser, (req, res) => {
    res.status(200).send({ status: "OK", ...req.user });
  });
module.exports=userRouter;