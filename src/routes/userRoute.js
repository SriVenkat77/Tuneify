import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";


dotenv.config();
const router = express.Router();

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isPremium: { type: Boolean, default: false },
});




const User = mongoose.model("User", userSchema);

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Register User

router.post("/register", async (req, res) => {
  console.log("Received Data:", req.body);

  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});





// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("Invalid credentials");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.send({
    token,
    isPremium: user.isPremium,
     name: user.name,
    email: user.email,
  });
});


router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Update User Details
router.put("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, email, password } = req.body;

    let user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



// Create Razorpay Order
router.post("/razorpay/order", async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);
    res.json({ id: order.id }); 

  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Verify Payment and Activate Premium


router.post("/razorpay/verify", async (req, res) => {
  const { paymentId, orderId, signature, email } = req.body;
  
  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isPremium = true;
    await user.save();

    await sendPremiumEmail(email, user.name);
    res.json({ success: true, message: "Premium activated!" });
  } catch (error) {
    res.status(500).json({ error: "Payment verification failed" });
  }
});


// Function to Send Email
async function sendPremiumEmail(email, name) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

     const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "🎵 Tuneify Premium Activated - Enjoy Ad-Free Music! ",
      html: `<div style="font-family: Arial, sans-serif; text-align: center;">
           <h2>🎉 Hello ${name},</h2>
           <p>🌟 <strong>Great News!</strong> Your <b>Tuneify Premium</b> subscription is now active! 🎶</p>
           <p>🎧 Enjoy unlimited music streaming, completely <b>ad-free</b>! No interruptions, just pure vibes. 🔥</p>
           <p>💖 Thank you for being a part of our music family!</p>
           <p>🎵 <b>Stay Tuned, Stay Groovy!</b> 🎶</p>
           <hr style="border: 1px solid #ddd;">
           <p>📩 Need help? Contact us at <a href="mailto:support@tuneify.com">support@tuneify.com</a></p>
         </div>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Premium activation email sent!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

router.get("/check-premium", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ isPremium: user.isPremium });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Admin route to get all users
router.get("/admin",  async (req, res) => {
  try {
    const users = await User.find().select("name email isPremium");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



export { router as userRouter };
