const { GoogleGenerativeAI } = require("@google/generative-ai");
const Listing = require("../models/listing.js");

const API_KEY = process.env.GEMINI_API_KEY;
console.log("🔑 GEMINI_API_KEY present:", !!API_KEY);

let genAI = null;
if (API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(API_KEY);
  } catch (e) {
    console.error("❌ Error initializing GoogleGenerativeAI:", e.message);
  }
}

/* =======================
   FALLBACK DESCRIPTION
======================= */

function fallbackDescription(title, location, category = "stay") {
  return `
Welcome to ${title} in ${location}, a thoughtfully designed ${category} crafted for guests who love comfort and style.
Wake up to relaxed vibes, unwind in cozy interiors, and enjoy easy access to popular local spots, cafes, and attractions nearby.
Whether you're travelling with friends, family, or planning a peaceful solo escape, this space gives you the perfect mix of convenience and warmth.
Settle in, unplug from the noise, and make ${location} your home for a while. ✨
`;
}

/* =======================
   AI DESCRIPTION
======================= */

module.exports.generateDescription = async (req, res) => {
  try {
    const { title, location, category } = req.body;

    if (!title || !location) {
      return res.status(400).json({ error: "Title and location are required" });
    }

    if (!API_KEY || !genAI) {
      return res.json({
        description: fallbackDescription(title, location, category),
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    const prompt = `
You are a professional hotel and travel description writer.

Create a 120–150 word attractive travel stay description for:
Title: ${title}
Location: ${location}
Category: ${category || "travel stay"}

Include atmosphere, nearby attractions, comfort, ideal guest.
Do NOT use bullet points. End with one friendly emoji.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    if (!responseText || !responseText.trim()) {
      return res.json({
        description: fallbackDescription(title, location, category)
      });
    }

    return res.json({ description: responseText });

  } catch (error) {
    console.error("❌ GEMINI ERROR:", error);

    return res.json({
      description: fallbackDescription(
        req.body.title,
        req.body.location,
        req.body.category
      )
    });
  }
};

/* =======================
   CHATBOT
======================= */

module.exports.chatbot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "Ask me something 🙂" });
    }

    const userText = message.toLowerCase();
    const baseUrl = req.protocol + "://" + req.get("host");

    const matches = await Listing.find({
      $or: [
        { title: { $regex: userText, $options: "i" } },
        { location: { $regex: userText, $options: "i" } },
        { country: { $regex: userText, $options: "i" } },
        { description: { $regex: userText, $options: "i" } }
      ]
    }).limit(5);

    if (matches.length > 0) {
      let reply = `🏡 I found these places for you:\n\n`;

      matches.forEach((listing, index) => {
        reply += `${index + 1}. ${listing.title} - ${listing.location}\n`;
        reply += `💰 ₹${listing.price} per night\n`;
        reply += `🔗 ${baseUrl}/listings/${listing._id}\n\n`;
      });

      return res.json({ reply });
    }

    if (!API_KEY || !genAI) {
      return res.json({
        reply: "I'm in offline mode ⚠️ But you can explore amazing stays on WanderHub 🌍"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    const prompt = `
You are WanderBot 🤖 – AI travel assistant for WanderHub.

User: ${message}

Reply in a short, friendly, helpful way.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    if (!responseText || !responseText.trim()) {
      return res.json({ reply: "Try rephrasing that 🙂" });
    }

    return res.json({ reply: responseText });

  } catch (error) {
    console.error("❌ CHATBOT ERROR:", error);

    return res.json({
      reply: "Something went wrong but I’m still here 🤖"
    });
  }
};
