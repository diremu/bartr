const mongoose = require("mongoose")
const Schema = mongoose.Schema

const itemSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: false
    },
    alt: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    item: {
        type: String,
        required: true
    },
    additionalViews: {
        type: [String],
        required: false
    },
    tradeOptions: {
        type: [String],
        required: false
    },
    ownerEmail: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Item", itemSchema)