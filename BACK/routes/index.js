const express=require('express')
const userRouter = require('./users.routes')
const propertiesRouter = require('./properties.routes')
const router=express.Router()

router.use('/users',userRouter)
router.use('/properties',propertiesRouter)

module.exports=router