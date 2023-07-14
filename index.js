const { MongoClient } = require("mongodb");

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const app = express();
const PasswordSchema = require("./model/password");
const cors = require("cors");
//Bodyparser Middleware
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "*", // Replace with your allowed origin(s)
    methods: "GET, POST, PUT, DELETE", // Replace with your allowed HTTP methods
    // allowedHeaders: "Content-Type, Authorization", // Replace with your allowed headers
  }),
);
//DB Config
const db = config.get("mongoURI");

//connect to mongoose server
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Define a route
app.post("/", async (req, res) => {
  console.log("request:", req.body);
  const { password } = req.body;
  try {
    const dataToAdd = {
      password: password,
    };
    const result = await PasswordSchema.create(dataToAdd);
    return res.send(result);
  } catch {
    return res.send("Error found");
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await PasswordSchema.find();
    return res.send(result);
  } catch {
    return res.send("Error found");
  }
});

// Start the server
const port = 4500;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
