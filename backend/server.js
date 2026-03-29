require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const questionRoutes = require("./routes/questionRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173" // URL تاع React frontend
}));
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/questions", questionRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
