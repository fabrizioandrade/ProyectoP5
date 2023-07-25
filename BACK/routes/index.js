const express=require('express')
const userRouter = require('./users.routes')
const propertiesRouter = require('./properties.routes')
const favoritesRouter = require('./favorites.routes')
const appointmentsRouter = require('./appointments.routes')

const router=express.Router()

router.use('/users',userRouter)
router.use('/properties',propertiesRouter)
router.use('/favorites',favoritesRouter)
router.use('/appointments',appointmentsRouter)
module.exports=router