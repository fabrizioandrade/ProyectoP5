const Appointments = require("../models/Appointments.models.");
const Properties = require("../models/Properties.models.");
const Users = require("../models/Users.models");
const sendEmail = require("../utils/gmail.utils");

const createAppointment = async (req, res) => {
  try {
    const { userId } = req.params;
    const { propertyId, appointmentDate } = req.body;
    const user = await Users.findByPk(userId);
    const property = await Properties.findByPk(propertyId);

    if (!user || !property) {
      return res
        .status(404)
        .json({ error: "Usuario o propiedad no encontrados." });
    }

    const existingAppointment = await Appointments.findOne({
      where: {
        propertyId: propertyId,
        date: appointmentDate,
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        error: "Ya hay una cita programada para esta propiedad en esta fecha.",
      });
    }

    const availabilityDates = property.availableDates || {};

    if (availabilityDates[appointmentDate] === false) {
      return res.status(400).json({ error: "La fecha no está disponible." });
    }

    const appointment = await Appointments.create({
      dateStatus: "confirmed",
      date: appointmentDate,
      userId: userId,
      propertyId: propertyId,
    });

    availabilityDates[appointmentDate] = false;
    await property.update({ availableDates: availabilityDates });

    const allAppointments = await Appointments.findAll({
      where: {
        propertyId: propertyId,
      },
    });

    const availableDates = {};
    allAppointments.forEach((appointment) => {
      availableDates[appointment.date] = false;
    });

    property.availableDates = availableDates;

    const emailResult = await sendEmail();
    console.log("Email sent successfully:", emailResult);

    return res
      .status(201)
      .json({ message: "Cita creada exitosamente.", appointment, property });
  } catch (error) {
    console.error("Error al crear la cita:", error);
    return res.status(500).json({ error: "Hubo un error al crear la cita." });
  }
};

const getAppointment=async(req,res)=>{
    try {
        const { userId } = req.params;
    
        const user = await Users.findByPk(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
    
        const appointments = await Appointments.findAll({
          where: { userId: userId },
          include: [Properties],
        });
    
        return res.json(appointments);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
        return res.status(500).json({ error: 'Hubo un error al obtener las citas.' });
      }
}

const deleteAppointment=async(req,res)=>{
    try {
        const { userId, appointmentId } = req.params;
    
        const user = await Users.findByPk(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
    
      
        const appointment = await Appointments.findOne({
          where: { id: appointmentId, userId: userId },
        });
    
        if (!appointment) {
          return res.status(404).json({ error: 'Cita no encontrada o no pertenece al usuario.' });
        }
    
        await appointment.destroy();
    
        return res.json({ message: 'Cita eliminada exitosamente.' });
      } catch (error) {
        console.error('Error al eliminar la cita:', error);
        return res.status(500).json({ error: 'Hubo un error al eliminar la cita.' });
      }
}

const updateAppointment=async(req,res)=>{
    try {
        const { userId, appointmentId } = req.params;
        const { appointmentDate } = req.body;
    
        const user = await Users.findByPk(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
    
        const appointment = await Appointments.findOne({
          where: { id: appointmentId, userId: userId },
        });
    
        if (!appointment) {
          return res.status(404).json({ error: 'Cita no encontrada o no pertenece al usuario.' });
        }
    
        appointment.date = appointmentDate;
        await appointment.save();
    
        return res.json({ message: 'Fecha de la cita modificada exitosamente.', appointment });
      } catch (error) {
        console.error('Error al modificar la fecha de la cita:', error);
        return res.status(500).json({ error: 'Hubo un error al modificar la fecha de la cita.' });
      }
}

const deleteAll = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await Users.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
  
      await Appointments.destroy({
        where: { userId: userId },
      });
  
      return res.json({ message: 'Todas las citas del usuario han sido eliminadas exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar todas las citas del usuario:', error);
      return res.status(500).json({ error: 'Hubo un error al eliminar todas las citas del usuario.' });
    }
  };

const getAllAppointments=async(req,res)=>{
  try {
    const appointments = await Appointments.findAll({
      include: [
        { model: Users },
        { model: Properties }
      ]
    });

    return res.json(appointments);
  } catch (error) {
    console.error('Error al obtener todas las citas:', error);
    return res.status(500).json({ error: 'Hubo un error al obtener todas las citas.' });
  }
}

module.exports={createAppointment,getAppointment,deleteAppointment,updateAppointment,deleteAll,getAllAppointments}