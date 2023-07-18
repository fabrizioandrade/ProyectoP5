const express=require('express');
const validateAdmin = require('../middlewares/admin.middleware');
const { getAllProperties } = require('../controllers/properties.controllers');
const propertiesRouter=express.Router()



propertiesRouter.get('/',getAllProperties)




module.exports=propertiesRouter;