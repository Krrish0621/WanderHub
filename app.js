if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// ✅ Routes
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const aiRoutes = require("./routes/ai.js");

const dbUrl = process.env.ATLASDB_URL;

// ====================
// VIEW ENGINE
// ====================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ====================
// MIDDLEWARES
// ====================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ====================
// DATABASE CONNECTION
// ====================
async function main() {
  await mongoose.connect(dbUrl);
  console.log("✅ MongoDB Connected");
}

main().catch(err => console.log("DB ERROR:", err));

// ====================
// SESSION (NO CONNECT-MONGO — VERCEL SAFE)
// ====================
const sessionOptions = {
  secret: process.env.SECRET || "wanderhub_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
};

app.use(session(sessionOptions));
app.use(flash());

// ====================
// PASSPORT
// ====================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ====================
// GLOBAL LOCALS
// ====================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ====================
// HOMEPAGE
// ====================
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// ====================
// ROUTES
// ====================
app.use("/ai", aiRoutes);
app.use("/", userRouter);
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// ====================
// 404 HANDLER
// ====================
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// ====================
// ERROR HANDLER
// ====================
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;

  if (res.headersSent) return next(err);

  res.status(statusCode).render("error.ejs", { message });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`🚀 WanderHub running on port ${PORT}`);
});
