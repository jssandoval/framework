const token = {};
// Models
const User = require("../models/user.model");

// Modules
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../configs/config");

token.isAuthenticated = async (req, res, next) => {
  //  console.log(req);
  //  try {
  if (!req.headers.authorization) {
    return res.status(401).send({ auth: false, message: "No token provided" });
  }
  let token = req.headers.authorization.split(" ")[1];
  req.school = req.headers.authorization.split(" ")[2];
  if (token === undefined) {
    return res.status(401).send({ auth: false, message: "Token null" });
  }
  try {
    var current_time = Date.now() / 1000;
    //console.log("token -" + token + "- secret " + config.jwtSecret);
    const decoded = await jwt.verify(token, config.jwtSecret);
    //console.log("hoy " + current_time + " vence " + jwt.token);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send({ auth: false, message: "No user found" });
    }
    //token.idAuthenticated = user._id;
    //console.log(token.idAutenticated);
  } catch (err) {
    //console.log("error " + err);
    return res.status(404).send({ auth: false, message: err });
  }
  next();
};