const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: String,

    image: {
        filename: String,
        url: String
    },

    price: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    // ✅ CATEGORY FOR FILTERING
    category: {
        type: String,
        default:"room",
        enum: [
            "trending",
            "room",
            "city",
            "mountain",
            "pool",
            "camping",
            "home",
            "surfing",
            "lake",
            "omg"
        ]
    },

    // ✅ MAPTILER / MAP SUPPORT
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number], // [lng, lat]
            required: true
        }
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }

}, { timestamps: true }); // auto adds createdAt & updatedAt

// ✅ Delete related reviews when listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
