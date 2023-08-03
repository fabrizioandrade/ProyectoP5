const express=require('express');
const validateUser = require('../middlewares/auth.middleware');
const validateAdmin = require("../middlewares/admin.middleware");
const { createAppointment, getAppointment, deleteAppointment,updateAppointment, deleteAll,getAllAppointments } = require('../controllers/appointments.controllers');

const appointmentsRouter=express.Router()

appointmentsRouter.get('/get/all/by/:userId',validateUser, getAppointment)
appointmentsRouter.get('/admin/all',validateAdmin, getAllAppointments)
appointmentsRouter.post('/create/:userId',validateUser, createAppointment)
appointmentsRouter.delete('/one/:userId/:appointmentId',validateUser, deleteAppointment)
appointmentsRouter.delete('/all/:userId',validateUser, deleteAll)
appointmentsRouter.put('update/:userId/:appointmentId',validateUser, updateAppointment)

module.exports=appointmentsRouter;