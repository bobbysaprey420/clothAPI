const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
})

const ImageModel = mongoose.model("image", ImageSchema, "image");

module.exports = { ImageModel, ImageSchema} ;