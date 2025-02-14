const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://ecommerce-mernstack-frontend.vercel.app",
    credentials: true,
  })
);

// Image upload
const uploadImage = require("./src/utils/uploadImage");

// All routes
const authRoutes = require("./src/users/user.route");
const productRoutes = require("./src/products/products.route");
const reviewRoutes = require("./src/reviews/reviews.router");
const orderRoutes = require("./src/orders/orders.route");
const statsRoutes = require("./src/stats/stats.route");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", statsRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("MongoDB is successfully connected.");
}

main().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Lebaba E-commerce Server is running....!");
});

app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

// ✅ تأكد من وضع هذا الجزء **خارج** `main()`
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
