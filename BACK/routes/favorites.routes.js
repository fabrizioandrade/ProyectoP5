const express=require('express');
const { addFavorite, getFavoritesByUserId, removeFavorite, getAllFavorites } = require('../controllers/favorites.controllers');
const validateUser = require('../middlewares/auth.middleware');
const validateAdmin = require('../middlewares/admin.middleware');
const favoritesRouter=express.Router()


favoritesRouter.post('/add/:userId/',validateUser,addFavorite)
favoritesRouter.get('/:userId',validateUser,getFavoritesByUserId)
favoritesRouter.delete('/remove/:userId',validateUser,removeFavorite)
favoritesRouter.get('/admin/all',validateAdmin,getAllFavorites)

module.exports=favoritesRouter;