import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB, dbError } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import os from "os";

// app config
const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB().catch((err) => console.error("Initial DB connection failed:", err));

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Access of uploaded images
// On Vercel, we serve from /tmp, locally we serve from "uploads"
const uploadDir = process.env.VERCEL ? os.tmpdir() : "uploads";
app.use("/images", express.static(uploadDir)); 

// Health Check and Root Routes
app.get("/", (req, res) => {
  res.send("API Working - Build: March 23 - 6:15 PM");
});

app.get("/api/health", async (req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  
  // Force a connection attempt if disconnected
  if (mongoose.connection.readyState === 0) {
    await connectDB();
  }

  // If connecting, wait up to 5 seconds for it to finish
  if (mongoose.connection.readyState === 2) {
    await new Promise((resolve) => {
      const timer = setTimeout(resolve, 5000);
      mongoose.connection.once("connected", () => {
        clearTimeout(timer);
        resolve();
      });
      mongoose.connection.once("error", () => {
        clearTimeout(timer);
        resolve();
      });
    });
  }

  res.json({
    status: "ok",
    db: states[mongoose.connection.readyState] || "unknown",
    readyState: mongoose.connection.readyState,
    dbError: dbError,
    env: {
      mongodb: !!process.env.MONGODB_URI,
      jwt: !!process.env.JWT_SECRET,
      stripe: !!process.env.STRIPE_SECRET_KEY,
      vercel: !!process.env.VERCEL,
      dbName: process.env.MONGODB_URI ? process.env.MONGODB_URI.split('/')[3]?.split('?')[0] : "none",
      dbPrefix: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 10) : "none",
    },
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

export default app;
