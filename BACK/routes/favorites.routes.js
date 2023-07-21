const express=require('express');
const { addFavorite, getFavoritesByUserId, removeFavorite } = require('../controllers/favorites.controllers');
const validateUser = require('../middlewares/auth.middleware');
const favoritesRouter=express.Router()


favoritesRouter.post('/add/:userId/',validateUser,addFavorite)
favoritesRouter.get('/:userId',validateUser,getFavoritesByUserId)
favoritesRouter.delete('/remove/:userId',validateUser,removeFavorite)

module.exports=favoritesRouter;