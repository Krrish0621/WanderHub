const Listing = require("../models/listing.js");

/* =========================
   INDEX
========================= */
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};


/* =========================
   NEW FORM
========================= */
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


/* =========================
   SHOW
========================= */
module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing
        .findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!listing) {
        req.flash("error", "The listing you requested does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};


/* =========================
   CREATE
========================= */
module.exports.create = async (req, res) => {

    if (!req.file) {
        req.flash("error", "Image is required!");
        return res.redirect("/listings/new");
    }

    const url = req.file.path;
    const filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    await newListing.save();

    req.flash("success", "New Listing Created!");
    return res.redirect(`/listings/${newListing._id}`);
};


/* =========================
   EDIT FORM
========================= */
module.exports.edit = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "The listing you requested does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image?.url;

    if (originalImageUrl) {
        originalImageUrl = originalImageUrl.replace(
            "/upload",
            "/upload/w_250,h_250,c_fill"
        );
    } else {
        originalImageUrl = "/images/default.jpg";
    }

    res.render("listings/edit.ejs", { listing, originalImageUrl });
};


/* =========================
   UPDATE
========================= */
module.exports.update = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { runValidators: true, new: true }
    );

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if (req.file) {
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    return res.redirect(`/listings/${id}`);
};


/* =========================
   DELETE
========================= */
module.exports.delete = async (req, res) => {
    let { id } = req.params;

    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    req.flash("success", "Listing Deleted!");
    return res.redirect("/listings");
};
