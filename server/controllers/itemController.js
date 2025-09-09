const Item = require("../model/Item")

const createItem = async (req, res) => {
    const {image,
      additionalViews,
      description,
      category,
      tradeOptions,
      ownerEmail,
      ownerName,
      price,
    } = req.body;
    if (!image || !category || !ownerEmail || !ownerName || !price || !description) {
        return res.status(400).json({message: "The form has not been properly filled"})
    }
    try {
        const newItem = new Item({
            image, additionalViews, description, category, tradeOptions, ownerEmail, ownerName, price
        })
        await newItem.save()
        return res.status(201).json({message: "Item successfully created"})
    } catch (err) {
        res.status(500).json({message: `Error ${err}`})
    }
} 

const listItems = async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).json({items})
    } catch (err) {
        res.status(500).json({message: `Error ${err}`})
    }
}

module.exports = {createItem, listItems}