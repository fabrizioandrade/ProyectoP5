const express = require("express");
const { createUser,loginUser,logOut } = require("../controllers/users");
const validateUser = require("../middlewares/auth");
const userRouter=express.Router()

userRouter.post('/register',createUser)
userRouter.post('/login',loginUser)
userRouter.post('/logout',logOut)
userRouter.get("/me", validateUser, (req, res) => {
    res.status(200).send({ status: "OK", ...req.user });
  });
module.exports=userRouter;