const Role = require("../model/role");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const cryptr = require("crypto-js");

module.exports.register = async (req, res) => {
  try {
    const param = { ...req.body };

    const user = await User.findOne({ email: param.email });
    if (user) return res.status(404).json({ error: "user already exsist" });

    const userRole = await Role.findOne({ name: "User" });
    param.role = userRole._id;
    let userSaved = await User.create(param);
    return res.status(201).json({ data: userSaved });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const param = { ...req.body };
    const user = await User.findOne({ email: param.email }).lean();
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    if (user.password !== param.password) {
      return res.status(404).json({ error: "email or password invalid" });
    }
    const accessToken = jwt.sign({ id: user._id }, "securePass", {
      expiresIn: "1d",
    });
    const encryptedToken = cryptr.AES.encrypt(
      accessToken,
      "securePass"
    ).toString();
    user.token = encryptedToken;
    return res.status(200).json({ data: user });
  } catch (error) {
    console.log("err", error);
    return res.status(500).json(error);
  }
};
module.exports.getUsers = async (req, res) => {
  try {
    const role = await Role.findOne({ name: "User" });
    const user = await User.find({ role: role._id });
    if(!user){
        return res.status(400).json("user not found");
    }
    return res.status(200).json({ data: user });
  } catch (error) {}
};
