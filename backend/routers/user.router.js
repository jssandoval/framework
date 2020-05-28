const router = require("express").Router();

const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  login,
  logout,
  uinfo,
  uschools,
  yetAuth 
} = require("../controllers/user.controller");

const { isAuthenticated } = require("../configs/token.helper");

// Routes
router.get("/users/signup", renderSignUpForm);
router.post("/users/signup", singup);
router.get("/users/signin", renderSigninForm);
router.post("/users/signin", signin);

router.post("/api/login", login);
router.get("/users/logout", logout);
router.get("/api/islogin", yetAuth);

// router.get("/users/info", isAuthenticated, uinfo);
// router.get("/users/schools", isAuthenticated, uschools);

module.exports = router;