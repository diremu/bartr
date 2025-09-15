const express = require("express")
const router = express.Router()
const otpController = require("../controllers/otpController.js")

router.post("/", otpController.otpGen)
router.post("/otp-check", otpController.checkOTP)

module.exports = router