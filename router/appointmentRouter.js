const express = require('express');
const router = new express.Router();
const appointmentController = require('../controller/appointmentController');
const { authentication } = require('../middleware/auth');

router.post('/createAppointment',authentication, appointmentController.addAppointment)
router.delete('/deleteAppointment/:id',authentication, appointmentController.deleteAppointment)
router.put('/updateAppointment/:id', authentication, appointmentController.updateAppointment)
router.get('/getAllAppointment',authentication, appointmentController.getAppointment)

//router.post('/login', appointmentController.login)



module.exports = router;