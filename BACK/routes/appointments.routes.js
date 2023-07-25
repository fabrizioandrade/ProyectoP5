const express=require('express');
const validateUser = require('../middlewares/auth.middleware');
const { createAppointment, getAppointment, deleteAppointment,updateAppointment, deleteAll } = require('../controllers/appointments.controllers');
const appointmentsRouter=express.Router()

appointmentsRouter.get('/:userId',validateUser, getAppointment)
appointmentsRouter.post('/:userId',validateUser, createAppointment)
appointmentsRouter.delete('/one/:userId/:appointmentId',validateUser, deleteAppointment)
appointmentsRouter.delete('/all/:userId',validateUser, deleteAll)
appointmentsRouter.put('/:userId/:appointmentId',validateUser, updateAppointment)

module.exports=appointmentsRouter;