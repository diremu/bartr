const express = require("express")
const router = express.Router()
const otpController = require("../controllers/otpController.js")

router.post("/", otpController.otpGen)

module.exports = router