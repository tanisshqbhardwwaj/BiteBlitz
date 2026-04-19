import mongoose from "mongoose";

export let dbError = null;

export const connectDB = async () => {
  // If already connected, do nothing
  if (mongoose.connection.readyState === 1) return;

  if (!process.env.MONGODB_URI) {
    dbError = "MONGODB_URI is missing";
    return;
  }

  try {
    // Optimized for Vercel Serverless environment
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Fail fast if cluster is unreachable
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4 to avoid DNS/Vercel handshake issues
    });
    console.log("DB connected");
    dbError = null;
  } catch (err) {
    dbError = err.message || "Unknown Connection Error";
    console.error("DB connection error:", err);
  }
};
