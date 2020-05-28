const usersCtrl = {};

// Models
const User = require("../models/user.model");
const config = require("../configs/config");
const { idAuthenticated } = require("../configs/auth.helper");


// Modules
const passport = require("passport");
const jwt = require("jsonwebtoken");

usersCtrl.renderSignUpForm = (req, res) => {
  res.render("user/signup");
};

usersCtrl.singup = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("user/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    //Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered.");
      res.redirect("/users/signin");
    }
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("user/signin");
};

usersCtrl.login = async (req, res) => {
  const errors = [];
  const { email, password } = req.body;

  // Xconsole.log("server " + email);
  const emailUser = await User.findOne({ email: email, status: true });
  //console.log(emailUser.email);
  //res.json(emailUser.email);
  if (!emailUser) {
    res.status(401).send({ auth: false, message: "Mail not found" });
  } else {
    // Saving a New User
    if (await emailUser.matchPassword(password)) {
      // console.log(">" + emailUser.password);
      // console.log(">" + emailUser._id);
      //console.log(await emailUser.encryptPassword(password));

      const token = jwt.sign({ id: emailUser._id }, config.jwtSecret, {
        expiresIn: Number(config.SessionTime),
      });
      // console.log(token);
      //req.userID = token._id;
      const resUser = await User.findById(emailUser._id, {
        password: 0,
        _id: 0,
        date_create: 0,
        date_modificatio: 0,
        date_lastchage: 0,
      });
      let ts = Date.now();

      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();
      let hoy = year + "-" + month + "-" + date;
      return res.status(200).json({
        auth: true,
        accessToken: token,
        expiresIn: config.SessionTime,
        date_create: hoy,
        name: resUser.name,
        email: resUser.email,
      });
    } else {
      return res
        .status(401)
        .json({ auth: false, accessToken: "Wrong Password" });
    }
  }

  //jwt.sign();
  //res.send("llego");
};


usersCtrl.signin = passport.authenticate("local", {
  successRedirect: "/config/school/all",
  failureRedirect: "/users/signin",
  failureFlash: true,
});

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/users/signin");
};

usersCtrl.uinfo = async (req, res) => {
  iduser = "";
  await idAuthenticated(req.headers.authorization.split(" ")[1]).then(
    (idUser) => {
      iduser = idUser;
    }
  );  

  const iuser = await User.findById(iduser);

  res.json({
    name: iuser.name,
    email: iuser.email,
    menus: iuser.menus,
    schools: iuser.schools,
  });
};

usersCtrl.uschools = async (req, res) => {
  iduser = "";
  await idAuthenticated(req.headers.authorization.split(" ")[1]).then(
    (idUser) => {
      iduser = idUser;
    }
  );
  const schools = await User.findById(iduser).populate(
    "schools"
  );
  // console.log(schools["schools"]);
  res.json(schools["schools"]);

};

usersCtrl.yetAuth = async (req, res ) => {
  id = "";
  sVal = "";
  try{
    //console.log("token");
    (req.headers.authorization.split(" ")[1]);
    await idAuthenticated(req.headers.authorization.split(" ")[1]).then(
      (id) => {
    // console.log("idº");
        console.log(id);
        sVal = id;
        id = idUser;
    sVal = "Is auth yet";
      }
    );
  }
  catch(e){
    //console.log("error");
    //console.log(e);
    sVal = "Not Token found";
  }
    // console.log("id id");
    // console.log(id);
    // console.log(sVal);
  // if (sVal==""){
  //   sVal = "Not Token found";
  // }
  // else {
  //   sVal = "Is auth yet";
  // }
    // console.log(sVal);
  res.json({
      status: sVal,
  });
};

module.exports = usersCtrl;
