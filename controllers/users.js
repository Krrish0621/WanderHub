const User = require("../models/user.js");

module.exports.signUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUpSubmit = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ email, username });
    await User.register(newUser, password);

    req.flash("success", "Welcome to WanderHub");

    const redirectUrl = req.session.redirectUrl || "/listings";
    delete req.session.redirectUrl;

    return res.redirect(redirectUrl);

  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/signup");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginFormSubmit = (req, res) => {
  req.flash("success", "Welcome back to WanderHub !!");

  const redirectUrl = req.session.redirectUrl || "/listings";
  delete req.session.redirectUrl;

  return res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    req.flash("success", "Logged you out!");
    return res.redirect("/listings");
  });
};
