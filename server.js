import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Required for __dirname in ES modules
import connectCloudinary from "./src/config/cloudinary.js";
import "dotenv/config";
import connectDB from "./src/config/mongodb.js";
import songRouter from "./src/routes/songRoute.js";
import albumRouter from "./src/routes/albumRoute.js";
import { userRouter } from "./src/routes/userRoute.js"; // Named import

// app config
const app = express();
const port = process.env.PORT || 4000;
connectCloudinary();
connectDB();

// middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static file serving for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Initializing Routers
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => res.send("API Working"));

app.get("/api/get-ad", async (req, res) => {
    const ads = [
      { message: "Enjoy unlimited music with our premium plan!" },
      { message: "Get 50% off on subscriptions this week!" },
      { message: "Upgrade now to remove ads and get exclusive features!" },
    ];
  
    const randomAd = ads[Math.floor(Math.random() * ads.length)];
    res.json(randomAd);
});

  

app.listen(port, () => console.log(`Server started on ${port}`));
