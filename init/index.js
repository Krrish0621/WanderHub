const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderhub";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const newData = initData.data.map(obj => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("69272b55fc6c879a5f7ef998")
  }));

  await Listing.insertMany(newData);

  console.log("✅ data was reinitialized with owner");
};

initDB();
