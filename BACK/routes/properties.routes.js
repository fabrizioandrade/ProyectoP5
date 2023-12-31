const express=require('express');
const validateAdmin = require('../middlewares/admin.middleware');
const { getAllProperties, getSingleProperty, getPropertyType, createProperty, deleteProperty, updateProperty ,searchPropertiesByName} = require('../controllers/properties.controllers');
const propertiesRouter=express.Router()



propertiesRouter.get('/',getAllProperties)
propertiesRouter.get('/:id',getSingleProperty)
propertiesRouter.get('/status/:type',getPropertyType)
propertiesRouter.post('/', validateAdmin, createProperty);
propertiesRouter.delete('/:id', validateAdmin, deleteProperty);
propertiesRouter.put('/:id', validateAdmin, updateProperty);
propertiesRouter.get('/search/:name',searchPropertiesByName)


module.exports=propertiesRouter;