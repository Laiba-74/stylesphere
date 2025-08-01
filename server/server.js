// explain
require('dotenv').config();
const express = require('express');

const app = express();
const path = require("path");
const connectDB = require('./config/db');
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allows undefined origins (e.g., Postman)
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
// Add this middleware to work with JSON
app.use(express.json());// delegate
app.get("/", (req, res) => {
  res.send("API is working");
});

// Image Uplaod 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Add this middleware to work with JSON
app.use(express.json());// delegate

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/productRoutes"));
connectDB().then(()=>{
    app.listen(5000,()=>{
        console.log("Server is running on Port # 5000");
    });
})

app.use((req, res) => {
  res.status(404).json({ msg: "Endpoint not found" });
});
