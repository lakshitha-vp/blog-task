const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/blogeditor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API routes
app.use("/api/blogs", require("./routes/blogs"));

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
