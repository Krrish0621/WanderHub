const express = require("express");
const router = express.Router();

const Listing = require("../models/listing"); 

const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listing.js");

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

/* =====================================
   GEO CODING MIDDLEWARE ✅ (FIXED)
===================================== */

const geoCodeLocation = async (req, res, next) => {
  try {
    if (!req.body.listing || !req.body.listing.location) {
      return next();
    }

    const location = req.body.listing.location;

    const geoURL = `https://api.maptiler.com/geocoding/${encodeURIComponent(
      location
    )}.json?key=${process.env.MAPTILER_KEY}`;

    const response = await fetch(geoURL);
    const geoData = await response.json();

    if (!geoData.features || geoData.features.length === 0) {
      req.flash("error", "Invalid location. Try again.");

      if (!res.headersSent) {
        return res.redirect(req.get("Referrer") || "/listings");
      }
      return;
    }

    req.body.listing.geometry = {
      type: "Point",
      coordinates: geoData.features[0].geometry.coordinates
    };

    next();
  } catch (err) {
    console.error(err);
    req.flash("error", "Location not found. Try again.");

    if (!res.headersSent) {
      return res.redirect(req.get("Referrer") || "/listings");
    }
    return;
  }
};


/* =========================
   SEARCH ROUTE ✅
========================= */

router.get("/search", wrapAsync(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    return res.redirect("/listings");
  }

  const allListings = await Listing.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } }
    ]
  });

  if (allListings.length === 0) {
    req.flash("error", "No listings found for this search");
  }

  res.render("listings/index", { allListings });
}));


/* =========================
   INDEX + CREATE
========================= */

router
  .route("/")

  .get(wrapAsync(listingController.index))

  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    geoCodeLocation,
    validateListing,
    wrapAsync(listingController.create)
  );


/* =========================
   NEW FORM
========================= */

router.get(
  "/new",
  isLoggedIn,
  listingController.renderNewForm
);


/* =========================
   SHOW + UPDATE + DELETE
========================= */

router
  .route("/:id")

  .get(wrapAsync(listingController.showListing))

  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    geoCodeLocation,
    validateListing,
    wrapAsync(listingController.update)
  )

  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.delete)
  );


/* =========================
   EDIT FORM
========================= */

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.edit)
);

module.exports = router;
