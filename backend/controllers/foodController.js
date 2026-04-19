import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item func
// So whenever addFood api gets clicked, in the body sending these details and access it in the backend using this function
// Using add food api function, new food items can be added in DB.
const addFood = async (req, res) => {
  try {
    // Check if we received an array of objects directly (if someone sends pure JSON)
    // or if we received stringified arrays from FormData (the standard way with files)
    let names = req.body.name;
    let descriptions = req.body.description;
    let prices = req.body.price;
    let categories = req.body.category;

    // Normalize to arrays if a single item was sent
    if (!Array.isArray(names)) {
      names = [names];
      descriptions = [descriptions];
      prices = [prices];
      categories = [categories];
    }

    // Ensure we have files
    if (!req.files || req.files.length === 0) {
      return res.json({ success: false, message: "No images uploaded" });
    }

    // Map through the arrays to create the food objects
    const foodsToInsert = names.map((name, index) => {
      // If we somehow have fewer files than data rows, fallback to the last valid file (shouldn't happen with our frontend)
      const fileIndex = index < req.files.length ? index : req.files.length - 1;
      
      return {
        name: name,
        description: descriptions[index],
        price: Number(prices[index]),
        category: categories[index],
        image: `${req.files[fileIndex].filename}`,
      };
    });

    // Save all items in one operation
    await foodModel.insertMany(foodsToInsert);
    res.json({ success: true, message: `${foodsToInsert.length} Food(s) Added` });

  } catch (error) {
    console.log("Error Batch Adding Foods:", error);
    res.json({ success: false, message: "Error", error: error.message });
  }
};

// All food list func- so that it can be accessed and send them as response.
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove food item func-
const removeFood = async (req, res) => {
  try {
    // Find the food model using the id
    const food = await foodModel.findById(req.body.id);

    // removing from file system and uploads folder
    fs.unlink(`uploads/${food.image}`, () => {});

    // removing from DB
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
