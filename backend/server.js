const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//Initializations
const app = express();
const db = require("./configs/database");
const config = require("./configs/config");
require("./configs/passport.helper");

//settings
dotenv.config();
app.set("port", process.env.PORT || config.PORT);
// app.set("views", path.join(__dirname, "views"));
// app.engine(
//   ".hbs",
//   exphbs({
//     defaultLayout: "main",
//     layoutsDir: path.join(app.get("views"), "layouts"),
//     partialsDir: path.join(app.get("views"), "partials"),
//     extname: ".hbs",
//     noEscape: true,
//   })
// );
// app.set("view engine", ".hbs");

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: config.SecretKey,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Global Variables
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash("success_msg");
//   res.locals.error_msg = req.flash("error_msg");
//   res.locals.error = req.flash("error");
//   res.locals.user = req.user || null;
//   next();
// });

//static files (imagenes, logos, etc)
// app.use(express.static(__dirname + "/public"));

//router
app.use(require("./routers/user.router"));
// app.use(require("./routes/config.routes"));

//Error Management
//custom 404 page
// app.use(function(req, res){
//   console.log(req.body);
//   res.status(404);
//     res.render('404');
// });

// //custom 500 page
// app.use(function(err, req, res, next){
//     console.error(err.fa-stack);
//     res.status(500);
//     res.render('500');
// });

module.exports = app;
