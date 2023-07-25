const express=require('express');
const validateUser = require('../middlewares/auth.middleware');
const { createAppointment, getAppointment, deleteAppointment,updateAppointment } = require('../controllers/appointments.controllers');
const appointmentsRouter=express.Router()

appointmentsRouter.get('/:userId',getAppointment)
appointmentsRouter.post('/:userId',createAppointment)
appointmentsRouter.delete('/:userId/:appointmentId',deleteAppointment)
appointmentsRouter.put('/:userId/:appointmentId',updateAppointment)

module.exports=appointmentsRouter;