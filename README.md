# 🌍 WanderHub – Travel & Stay Discovery Platform

WanderHub is a full-stack web application inspired by Airbnb that helps users discover, list, and review unique travel stays around the world.
It includes AI-powered descriptions, interactive maps, authentication, reviews, and a modern responsive UI.

---

## 🚀 Live Demo
👉 Render: [https://wanderhub.onrender.com ](https://wanderhub-1px6.onrender.com/listings)

---

## ✨ Features

- ✅ User authentication (Signup / Login / Logout)
- ✅ Create, edit & delete listings
- ✅ Image upload with Cloudinary
- ✅ Interactive maps (MapTiler + MapLibre)
- ✅ AI-generated descriptions (Google Gemini)
- ✅ Reviews and ratings system
- ✅ Listing search & category filters
- ✅ Categories: hotel, villa, beach, mountain, etc.
- ✅ Fully responsive UI (mobile + desktop)
- ✅ Secure sessions using MongoDB store

---

## 🛠 Tech Stack

**Frontend**

- EJS
- Bootstrap 5
- Font Awesome

**Backend**

- Node.js
- Express.js
- Passport.js

**Database**

- MongoDB Atlas
- Mongoose

**APIs & Services**

- MapTiler
- Cloudinary
- Google Gemini AI

---

## 📁 Folder Structure

WanderHub/
│
├── controllers/<br>
├── models/<br>
├── routes/<br>
├── views/<br>
├── public/<br>
├── utils/<br>
├── middleware.js<br>
├── schema.js<br>
├── cloudConfig.js<br>
├── app.js<br>
├── vercel.json<br>
├── package.json<br>
└── .env

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add the following:

ATLASDB_URL=your_mongodb_connection_string <br>
MAPTILER_KEY=your_maptiler_api_key<br>
CLOUD_NAME=your_cloudinary_cloud_name<br>
CLOUD_API_KEY=your_cloudinary_api_key<br>
CLOUD_API_SECRET=your_cloudinary_api_secret<br>
GEMINI_API_KEY=your_gemini_api_key<br>
SECRET=your_session_secret<br>

---

## 💻 Run Locally

1. Clone the repo<br>
git clone https://github.com/Krrish0621/wanderhub.git

2. Go to project folder<br>
cd wanderhub

3. Install dependencies<br>
npm install

4. Start the server<br>
npm start

5. Open in browser<br>
http://localhost:8080/listings

## 🙌 Future Features

- ❤️ Save / Favourite listings
- 💬 Messaging between users
- ✈️ Trip planner
- ⭐ Top rated section
- 📱 Mobile App version
-  
---

## 👨‍💻 Author
**Krrish Chaturvedi**<br>
GitHub: https://github.com/Krrish0621<br>
Project: WanderHub<br>
---
