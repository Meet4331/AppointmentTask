const User = require("../model/user");

const jwt = require("jsonwebtoken");
const cryptr = require("crypto-js");

module.exports.authentication = async (req, res, next) => {
  try {
    if (!(req.headers && req.headers.authorization))
      return res.status(401).json({ error: "no token provided" });

    const encryptedToken = req.header("authorization").replace("Bearer ", "");
    const decryptedToken = cryptr.AES.decrypt(
      encryptedToken,
      "securePass"
    ).toString(cryptr.enc.Utf8);
        console.log(decryptedToken);
    // Verify token
    const verifyUser = jwt.verify(decryptedToken, "securePass");
    
    const user = await User.findOne({ _id: verifyUser.id})

    if(!user){
        return res.status(400).json({error: "unauthorized"});
    }
    req.userId = user._id
    return next()
  } catch (e) {
    return res.status(500).json(error);
  }
};
