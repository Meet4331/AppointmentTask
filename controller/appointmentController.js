const Appointment = require("../model/appointment");

module.exports.addAppointment = async (req, res) => {
  try {
    const param = { ...req.body };
    console.log(req.userId);
    const appointment = await Appointment.create(param);

    return res.status(201).json({ data: appointment });
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports.deleteAppointment = async (req, res) =>{
    try {
        const param = { ...req.params };
        console.log(param);
        const deleteAppointment = await Appointment.findOneAndDelete(param)
        if(!deleteAppointment){
            return res.status(404).json({ error: "id not found"})
        }
        return res.status(201).json("deleted");
    } catch (error) {
        
    }
}

module.exports.updateAppointment = async (req, res) =>{
    try {
        const body = { ...req.body };
        const param = req.params.id
        console.log(param);
        const updateAppointment = await Appointment.findByIdAndUpdate(param, body, { new: true })
        if(!updateAppointment){
            return res.status(404).json({ error: "appointment does not found"})
        }
        return res.status(201).json(updateAppointment);
    } catch (error) {
        
    }
}

module.exports.getAppointment = async (req, res) => {
    try {
      const user = await Appointment.find();
      if (!user) {
        return res.status(404).json({ error: "appointment does not found"})
      }
      return res.status(200).json({ data: user });
    } catch (error) {}
  };
  