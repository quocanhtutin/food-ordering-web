import e from "express";
import foodModel from "../models/FoodModel.js";
import fs from "fs";


//add food item

const addFood = async (req, res) => {

    let image_filename = "default.jpg";

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })
    try {
        await food.save();
        res.json({ succes: true, message: "Food item added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to add food item" });
    }
}

export { addFood };