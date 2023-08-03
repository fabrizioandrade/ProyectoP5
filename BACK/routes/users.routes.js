const express = require("express");
const {
  createUser,
  loginUser,
  logOut,
  getAllUsers,
  getOneUser,
  searchUser,
  contactAdmin,
} = require("../controllers/users.controllers");
const validateUser = require("../middlewares/auth.middleware");
const Joi = require("joi");
const validateAdmin = require("../middlewares/admin.middleware");
const { generateToken } = require("../config/tokens");
const {
  googleCallback,
  googleLogin,
} = require("../middlewares/google.middleware");
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
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    }
    next();
  },
  createUser
);
userRouter.post("/login", loginUser);

userRouter.post("/logout", logOut);
userRouter.post('/contact/admin/:userId',validateUser,contactAdmin)

userRouter.get("/me", validateUser, (req, res) => {
  res.status(200).send({ status: "OK", ...req.user });
});
userRouter.get("/admin", validateAdmin, getAllUsers);
userRouter.get("/admin/info/:id", validateAdmin, getOneUser);
userRouter.get("/search/:query", validateAdmin, searchUser);
userRouter.get("/auth/google", googleLogin);
userRouter.get("/auth/google/callback", googleCallback, (req, res) => {
  try {
    console.log("req", req);
    if (req.user.success) {
      const token = generateToken(req.user.data);
      res.cookie("token", token);
      res.redirect("http://localhost:5173/home");
    } else {
      res.redirect("http://localhost:5173/");
    }
  } catch (error) {
    console.log("error", error);
    return res.status(400).send({
      success: false,
      message: "Hubo un error en el inicio de sesión",
    });
  }
});

module.exports = userRouter;
