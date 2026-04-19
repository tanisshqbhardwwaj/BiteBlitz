import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

import os from "os";

// Create Express Router
const foodRouter = express.Router();

// Define upload directory (use /tmp on Vercel because the root is read-only)
const uploadDir = process.env.VERCEL ? os.tmpdir() : "uploads";

// Image Storage Engine using the multer diskStorage method
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Routes:
foodRouter.post("/add", upload.array("images", 5), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
