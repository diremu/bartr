require("dotenv").config()
const express = require("express")
const app = express()
const port = 3200
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const mongoose = require("mongoose")
const connectDB = require("./config/dbConnection")
const verifyJWT = require("./middleware/verifyJWT")

connectDB();
//to handle json data
app.use(express.json())
//to handle static files
app.use(express.static("public"))
app.use(cors(corsOptions))

app.use('/', require("./routes/root"))
app.use('/signup', require("./routes/signup"))
app.use('/login', require("./routes/login"))

app.use('/items', require('./routes/items'))
app.use('/list-item',verifyJWT, require("./routes/items"))

//this sets it up so that the server starts once mongoose has confirmed a db connection
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB")
    app.listen(port, () => console.log(`Server running on port ${port}`))
})