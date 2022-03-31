require("dotenv").config();
const express = require('express');
const app = express();
const userRoutes = require('./router/userRouter');
const appointmentRoutes = require('./router/appointmentRouter');
require('./db/mongoose');

const port = process.env.PORT || 3000 ;

app.use(express.json());
app.use(userRoutes);
app.use(appointmentRoutes)

app.listen(port, ()=>{
    console.log("runnimmg on "+port);
})
