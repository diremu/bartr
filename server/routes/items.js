const express = require("express")
const router = express.Router()
const {createItem, listItems} = require("../controllers/itemController.js")

router.post("/", createItem)
router.get("/", listItems)
module.exports = router;