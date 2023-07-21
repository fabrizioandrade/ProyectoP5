const Favorites = require("../models/Favorites.models.");
const Properties = require("../models/Properties.models.");
const Users = require("../models/Users.models");

const addFavorite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const propertyId = req.body.id;
    console.log(req.body);
    // verifica si el usuario existe
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // verifica si la propiedad existe
    const property = await Properties.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Propiedad no encontrada" });
    }


    /**magic method por la asociacion hasMany */
    const favorites = await user.getFavorites({
      include: [Properties],
    });
    console.log(favorites);


    /**va a devolver true o false
     * El método some() comprueba si al menos un elemento del array cumple con la condición implementada por la función proporcionada.
     */
    const isInFavorite = favorites.some((favorite) =>
      favorite.properties.some((prop) => prop.id === propertyId)
    );

    if (isInFavorite) {
      return res
        .status(400)
        .json({ error: "Esta propiedad ya está en la lista de favoritos del usuario" });
    }

    // agrega la propiedad a la lista de favoritos del usuario
    const favorite = await Favorites.create({ userId });
    await favorite.addProperty(property); /**Este método es automáticamente generado debido a la asociación belongsToMany */
    return res
      .status(200)
      .json({ message: "Propiedad agregada a favoritos exitosamente" });
  } catch (error) {
    console.error("Error al agregar propiedad a favoritos:", error);
    return res
      .status(500)
      .json({ error: "Error al agregar propiedad a favoritos" });
  }
};

const getFavoritesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // verificar si el usuario existe
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    //obtiene todas las propiedades favoritas del usuario
    const favorites = await Favorites.findAll({
      where: { userId },
      include: [Properties],
    });

    const validFavorites = favorites.filter((fav) => fav.properties.length > 0);

    return res.status(200).json({ validFavorites });
  } catch (error) {
    console.error("Error al obtener propiedades favoritas:", error);
    return res.status(500).json({ error: "Error al obtener propiedades favoritas" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const propertyId = req.body.id;

    // verifica si el usuario existe
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // verifica si la propiedad existe
    const property = await Properties.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Propiedad no encontrada" });
    }

    // obtiene todas las propiedades favoritas del usuario
    const favorites = await Favorites.findAll({
      where: { userId },
      include: [Properties],
    });

    const favorite = favorites.find((fav) =>
      fav.properties.some((prop) => prop.id === propertyId)
    );

    if (!favorite) {
      return res.status(400).json({
        error: "Esta propiedad no está en la lista de favoritos del usuario",
      });
    }

    // elimina la propiedad de la lista de favoritos del usuario
    await favorite.removeProperty(property);

    return res
      .status(200)
      .json({ message: "Propiedad eliminada de favoritos exitosamente" });
  } catch (error) {
    console.error("Error al eliminar propiedad de favoritos:", error);
    return res
      .status(500)
      .json({ error: "Error al eliminar propiedad de favoritos" });
  }
};



module.exports = { addFavorite,getFavoritesByUserId,removeFavorite};
