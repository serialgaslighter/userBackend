import "dotenv/config";
import mongoose from "mongoose";

import { User } from "./src/models/userModel.js";

const MONGO_DB_URI = process.env.MONGO_DB_URI;

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log(`Connection with mongoDB: SUCCESS ✅`);

    const users = [
      {
        email: "alice@example.com",
        username: "alice123",
        password: "password123",
      },
      {
        email: "bob@example.com",
        username: "bobby",
        password: "securePass456",
      },
      {
        email: "carol@example.com",
        username: "carolx",
        password: "mySecret789",
      },
      {
        email: "dave@example.com",
        username: "davey",
        password: "anotherPass101",
      },
      {
        email: "eve@example.com",
        username: "eve_the_coder",
        password: "codeRocks2024",
      },
      {
        email: "frank@example.com",
        username: "frank_007",
        password: "BondJamesBond",
      },
      {
        email: "grace@example.com",
        username: "graceful123",
        password: "gracefulPW",
      },
    ];
    

    // Testdaten in DB einfügen
    User.insertMany(users)
      .then(() => {
        console.log("Testdaten erfolgreich hinzugefügt.");
        mongoose.disconnect();
      })
      .catch(error => {
        console.error("Testdaten nicht erfolgreich hinzugefügt.")
        mongoose.disconnect();
      })
  })
  .catch(error => {
    console.error(`Connection with mongoDB: FAILED ⛔:`, error);
  })
