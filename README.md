🌍 WanderHub<p align="center"><strong>Travel & Stay Discovery Platform</strong>A full-stack web application inspired by Airbnb that helps users discover, list, and review unique travel stays around the world.</p><p align="center"><a href="https://wanderhub-1px6.onrender.com/listings"><strong>🚀 View Live Demo</strong></a><img src="https://img.shields.io/badge/Node.js-green?style=flat&logo=node.js" alt="Node"><img src="https://img.shields.io/badge/Express-lightgrey?style=flat&logo=express" alt="Express"><img src="https://img.shields.io/badge/MongoDB-green?style=flat&logo=mongodb" alt="MongoDB"><img src="https://img.shields.io/badge/Bootstrap-purple?style=flat&logo=bootstrap" alt="Bootstrap"></p>📖 AboutWanderHub is a comprehensive travel platform that includes AI-powered descriptions, interactive maps, secure authentication, and a robust review system. Built with a modern responsive UI, it allows users to explore accommodations by category (hotels, villas, beaches) and manage their own listings seamlessly.✨ Key Features🔐 Authentication: Secure Signup, Login, and Logout functionality using Passport.js.📝 CRUD Operations: Users can Create, Read, Update, and Delete their own listings.🤖 AI Integration: Auto-generate creative listing descriptions using Google Gemini AI.🗺️ Interactive Maps: Visual location picking and display using MapTiler & MapLibre.☁️ Cloud Storage: Seamless image uploads and management via Cloudinary.⭐ Reviews & Ratings: Real-time review system for user feedback.🔍 Search & Filters: Filter stays by categories like Hotel, Villa, Beach, Mountain, etc.📱 Responsive Design: optimized for mobile, tablet, and desktop viewing.🛠 Tech StackAreaTechnologiesFrontendEJS, Bootstrap 5, Font Awesome, HTML5, CSS3BackendNode.js, Express.jsDatabaseMongoDB Atlas, MongooseAuthenticationPassport.js (Local Strategy)APIs & ServicesMapTiler (Maps), Cloudinary (Images), Google Gemini (AI)📁 Folder StructurePlaintextWanderHub/
│
├── controllers/      # Route logic and request handling
├── models/           # Mongoose schemas (Listing, Review, User)
├── routes/           # Express routes (listings, reviews, users)
├── views/            # EJS templates (layouts, includes, pages)
├── public/           # Static files (CSS, JS, Images)
├── utils/            # Error handling and helper functions
├── middleware.js     # Auth and validation middleware
├── schema.js         # Joi validation schemas
├── cloudConfig.js    # Cloudinary configuration
├── app.js            # Main application entry point
├── package.json      # Project dependencies
└── .env              # Environment variables
🔑 Environment VariablesTo run this project, you will need to create a .env file in the root directory and add the following environment variables:PropertiesATLASDB_URL=your_mongodb_connection_string
MAPTILER_KEY=your_maptiler_api_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
SECRET=your_session_secret
💻 Run LocallyFollow these steps to set up the project locally.1. Clone the repositoryBashgit clone https://github.com/Krrish0621/wanderhub.git
2. Navigate to the project directoryBashcd wanderhub
3. Install dependenciesBashnpm install
4. Start the serverBashnpm start
5. Access the applicationOpen your browser and go to:http://localhost:8080/listings🙌 Roadmap & Future Features[ ] ❤️ Wishlists: Save/Favourite listings for later.[ ] 💬 Chat System: Direct messaging between hosts and guests.[ ] ✈️ Trip Planner: Organize itineraries based on bookings.[ ] ⭐ Featured: Top-rated section for high-quality stays.[ ] 📱 PWA: Progressive Web App implementation.👨‍💻 AuthorKrrish ChaturvediGitHub: @Krrish0621Project: WanderHub<p align="center"><strong>⭐ If you like this project, please give it a star! ⭐</strong></p>
