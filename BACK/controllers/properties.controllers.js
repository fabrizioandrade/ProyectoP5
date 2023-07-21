const Appointments = require("../models/Appointments.models.");
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

const getSingleProperty=async(req,res)=>{
  try {
    const property = await Properties.findByPk(req.params.id);

    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ error: "Propiedad no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}


const getPropertyType=async(req,res)=>{
  try {
    const properties = await Properties.findAll({
      where: { statusType: req.params.type },
    });

    if (properties.length > 0) {
      res.json(properties);
    } else {
      res.status(404).json({ error: "No se encontraron propiedades" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

const createProperty=async(req,res)=>{
  try {
    const property = await Properties.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear propiedad' });
  }
}

const deleteProperty=async(req,res)=>{
  const propertyId = req.params.id;

  try {
    // Eliminar las relaciones asociadas
    await Appointments.destroy({ where: { propertyId: propertyId } });
    

    // Eliminar la propiedad
    await Properties.destroy({ where: { id: propertyId } });

    res.status(200).json({ message: "Propiedad eliminada correctamente." ,propertyId:propertyId});
  } catch (error) {
    res.status(400).json({ error: "No se pudo eliminar la propiedad." });
  }
}

const updateProperty=async(req,res)=>{
  const propertyId = req.params.id
  const {
    name,
    description,
    descriptionData,
    category,
    status,
    statusType,
    price,
    imgURL,
    neighborhood,
    city,
    country,
  } = req.body;
  try {
    await Properties.update({name,
      description,
      descriptionData,
      category,
      status,
      statusType,
      price,
      imgURL,
      neighborhood,
      city,
      country},{where:{id:propertyId}})
      
      res.status(200).send({
        success: true,
        message: "propiedad editada correctamente",
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "error al editar la propiedad",
    });
  }
}
module.exports={getAllProperties,getSingleProperty,getPropertyType,createProperty,deleteProperty,updateProperty}