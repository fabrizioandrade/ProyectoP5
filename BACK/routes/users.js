const express = require("express");
const { createUser,loginUser,logOut } = require("../controllers/users");
const userRouter=express.Router()

userRouter.post('/register',createUser)
userRouter.post('/login',loginUser)
userRouter.post('/logout',logOut)

module.exports=userRouter;