const mongoose = require("mongoose");
const { CategorySchema } = require("./category")
const { ImageSchema } = require("./image")

const ClothSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    type: {
        type: CategorySchema,
        required: true,
    },
    image:{
        type: ImageSchema,
        required: true,
    }
});

const ClothModel = mongoose.model("cloth", ClothSchema, "cloth");

module.exports = ClothModel;