const {kMaxLength} = require("buffer");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String, required: [true, "enter title name"]
        },
        desc: {
            type: String, required: [true, "provide the description"],
            kMaxLength: 50
        },
        img: {
            type: String, required: [true, "  image url"]
        },

        price: {type: Number, required: [true, "price is essential"]},
        inStock: {type: Boolean, default: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model("products", ProductSchema);