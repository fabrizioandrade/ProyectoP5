const Properties = require("../models/Properties.models.");

const getAllProperties = async (req, res) => {
    try {
        const properties = await Properties.findAll();
        res.json(properties);
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al obtener productos' });
      }
  }


module.exports={getAllProperties}