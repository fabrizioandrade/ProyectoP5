const express = require("express");
const {
  createUser,
  loginUser,
  logOut,
  getAllUsers,
  getOneUser,searchUser
} = require("../controllers/users.controllers");
const validateUser = require("../middlewares/auth.middleware");
const Joi = require("joi");
const validateAdmin = require("../middlewares/admin.middleware");
const passport = require("passport");
const userRouter = express.Router();

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  code: Joi.string().allow(""),
});

userRouter.post(
  "/register",
  (req, res, next) => {
    // Valida los datos del registro usando el esquema
    const { error } = registerSchema.validate(req.body);
    if (error) {
      // Si hay un error de validación, devuelve una respuesta de error
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    }
    // Si los datos son válidos, llama a la función createUser
    next();
  },
  createUser
);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logOut);
userRouter.get("/me", validateUser, (req, res) => {
  res.status(200).send({ status: "OK", ...req.user });
});
userRouter.get("/admin", validateAdmin, getAllUsers);
userRouter.get("/admin/info/:id", validateAdmin, getOneUser);
userRouter.get("/search/:query", validateAdmin, searchUser);
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Ruta de redirección después de autorización de Google
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { session:true}),(req,res)=>{
try {   
  if (req.user.success) {
  res.cookie("token", req.user.token);
}

return res.status(200).send({
  success: req.user.success,
  data: req.user.data,
});
  
} catch (error) {
  console.log('errror',error);
  return res.status(400).send({
    success: false,
    message: "Hubo un error en el inicio de sesión",
  });
}
  }
);

module.exports = userRouter;
