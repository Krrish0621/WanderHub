const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


/* =====================
   SIGNUP
   ===================== */

router.route("/signup")
  // Show signup form
  .get(userController.signUpForm)

  // Submit signup form
  .post(wrapAsync(userController.signUpSubmit));


/* =====================
   LOGIN
   ===================== */

router.route("/login")
  // Show login form
  .get(userController.loginForm)

  // Submit login form
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
      keepSessionInfo: true
    }),
    userController.loginFormSubmit
  );


/* =====================
   LOGOUT
   ===================== */

router.get("/logout", userController.logout);


module.exports = router;
