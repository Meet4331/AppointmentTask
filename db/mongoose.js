const mongoose = require("mongoose");
const Role = require("../model/role");
const User = require("../model/user");
const connectionUrl =
  process.env.MONGODB || "mongodb://127.0.0.1:27017/appointment";

mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async() => {
    console.log("connection succesful");
    await role()
    await user()
  })
  .catch((err) => {
    console.log("connection fail", err);
  });

const role = async () => {
  const role = await Role.find();
  if (!role.length) {
    const rolesArr = [
      { name: "Admin", status: 1 },
      { name: "User", status: 1 },
    ];
    await Role.create(rolesArr);
  }
};
const user = async () => {
    const role = await Role.findOne({name: "Admin"});
    const user = await User.find({role: role._id})
    if (!user.length ) {
      const userArr = [
        { name: "Admin", password: "12345", email: "admin@gmail.com", role: role._id },
      ];
      await User.create(userArr);
    }
  };