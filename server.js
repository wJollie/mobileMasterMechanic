import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your Place ID
const PLACE_ID = "11kh7hzypj";

// Endpoint to fetch Google Reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${process.env.GOOGLE_API_KEY}`
    );
    const data = await response.json();

    if (data.result && data.result.reviews) {
      res.json(data.result.reviews);
    } else {
      res.status(404).json({ error: "No reviews found." });
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
});

// Serve static frontend files
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
